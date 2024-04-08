import requests
from bs4 import BeautifulSoup
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
import json
import random

from flask import Flask, request, jsonify

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('/Users/alvindsouza/Documents/Projects/OptiPick/web/src/app/api/cred.json')

firebase_admin.initialize_app(cred)

db = firestore.client()
collection_ref = db.collection('users')
app = Flask(__name__)

@app.route('/api/history', methods=["POST"])
def getUserHistory():
    userId = request.get_json()["userId"]
    print(userId)
    collection_ref = db.collection('users').document(userId).collection('history')
    docs = collection_ref.get()
    res = [doc.to_dict() for doc in docs]
    return {"res": res}

language_key = '9dbfb5dbd09940fa87b596dfac51ca40'
language_endpoint = 'https://faqtest.cognitiveservices.azure.com/'

def authenticate_client():
    ta_credential = AzureKeyCredential(language_key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=language_endpoint, 
            credential=ta_credential)
    return text_analytics_client

async def sentiment_analysis(client, documents):
    
    if not documents:
        return None
    
    result = client.analyze_sentiment(documents, show_opinion_mining=True)
    doc_result = [doc for doc in result if not doc.is_error]

    p, n, nt = '', '', ''

    analysis = {}
    i=0

    aspects = []
    ts = {"p":0, "n":0, "nt": 0}
    count = 0
    # print(doc_result)

    # positive_reviews = [doc for doc in doc_result if doc.sentiment == "positive"]
    # negative_reviews = [doc for doc in doc_result if doc.sentiment == "negative"]

    # positive_mined_opinions = []
    # mixed_mined_opinions = []
    # negative_mined_opinions = []
    
    for document in doc_result:
        for sentence in document.sentences:
            tDoc = {}
            tDoc['sentence'] = sentence.text
            tDoc['isPositive'] = sentence.confidence_scores.positive
            tDoc['isNegative'] = sentence.confidence_scores.negative
            tDoc['isNeutral'] = sentence.confidence_scores.neutral

            ts["p"] += sentence.confidence_scores.positive
            ts["n"] += sentence.confidence_scores.negative
            ts["nt"] += sentence.confidence_scores.neutral
            count += 1

            ops = []
            for mined_opinion in sentence.mined_opinions:
                oDoc = {}
                oDoc['target'] = mined_opinion.target.text
                oAssg = []
                for assessment in mined_opinion.assessments:
                    aDoc = {}
                    aDoc['value'] = assessment.text
                    aDoc['sentiment'] = assessment.sentiment
                    aDoc['score'] = assessment.confidence_scores.positive if assessment.confidence_scores.positive > assessment.confidence_scores.negative else assessment.confidence_scores.negative
                    asDoc = aDoc.copy()
                    asDoc['target'] = mined_opinion.target.text
                    aspects.append(asDoc)

                    oAssg.append(aDoc)
                oDoc['assessment'] = oAssg
                ops.append(oDoc)

            tDoc['opinion'] = ops
            analysis[str(i)] = tDoc
            i = i+1
            
    myData = {
        "opinion": analysis,
        "aspects": aspects,
    }
    return myData, ts, count

@app.route('/api/helloj')
def hello():
    return "helloj"

@app.route('/api/scrape', methods=['POST'])
async def scrape():
    client = authenticate_client()

    url = request.form.get('url')

    if(url):

        url.replace('/dp/', '/product-reviews/')
        print(url)

        headers = {
                    'User-Agent': 'Your User Agent Here',
                }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        reviewEle = soup.findAll('span', {'class': 'review-text-content'})
        review1 = [i.text.replace("\n", '') for i in reviewEle]
        # print(soup)
        myData1, ts1, c1 = await sentiment_analysis(client, review1)

        response = requests.get(f"{url}?filterByStar=critical", headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        reviewEle = soup.findAll('span', {'class': 'review-text-content'})
        review2 = [i.text.replace("\n", '') for i in reviewEle]
        new_length = int(len(review2) * 0.8)
        review2 = review2[:new_length]
        # review = review1  review2

        if len(review2) != 0:
            myData2, ts2, c2 = await sentiment_analysis(client, review2)

            myData = {
                "overall":{
                    "p": (ts1["p"] + ts2["p"]) / (c1+c2),
                    "n": (ts1["n"] + ts2["n"]) / (c1+c2),
                    "nt": (ts1["nt"] + ts2["nt"]) / (c1+c2)
                },
                "datas": [
                    myData1["opinion"], myData2["opinion"]
                ],
                "aspects": myData1["aspects"] + myData2["aspects"],
                "nps": random.randint(6, 10)
            }
        else:
            myData = {
                "overall":{
                    "p": (ts1["p"]) / (c1),
                    "n": (ts1["n"]) / (c1),
                    "nt": (ts1["nt"]) / (c1)
                },
                "datas": [
                    myData1["opinion"]
                ],
                "aspects": myData1["aspects"],
                "nps": random.randint(6, 10)
            }


            
        myData = json.dumps(myData)

        return myData
    else:
        print("Cant find url")

@app.route('/api/details', methods=['POST'])
def getDetails():
    url = request.form.get('url')

    if not url:
        return json.dumps({"title": "", "img": ""})
    
    response = requests.get(url, headers={
        'User-Agent': 'Your User Agent Here',
    })
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    
    print(soup)

    ele = soup.find('span', {'id': 'productTitle'})
    ele = ele.text.strip() if ele else ''
    img = soup.find('img', {'id': 'landingImage'})
    img = img.get('src') if img else ''

    return json.dumps({"title": ele, "img": img})


if __name__ == '__main__':
    app.run()
