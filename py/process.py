from flask import Flask, request, make_response, jsonify
from bs4 import BeautifulSoup
import requests
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
import json

language_key = '9dbfb5dbd09940fa87b596dfac51ca40'
language_endpoint = 'https://faqtest.cognitiveservices.azure.com/'

def authenticate_client():
    ta_credential = AzureKeyCredential(language_key)
    text_analytics_client = TextAnalyticsClient(
            endpoint=language_endpoint, 
            credential=ta_credential)
    return text_analytics_client

def sentiment_analysis(client, documents):

    result = client.analyze_sentiment(documents, show_opinion_mining=True)
    doc_result = [doc for doc in result if not doc.is_error]

    analysis = {}
    i = 0

    for document in doc_result:
        for sentence in document.sentences:
            tDoc = {}
            tDoc['sentence'] = sentence.text
            tDoc['isPositive'] = sentence.confidence_scores.positive
            tDoc['isNegative'] = sentence.confidence_scores.negative
            tDoc['isNeutral'] = sentence.confidence_scores.neutral
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
                    oAssg.append(aDoc)
                oDoc['assessment'] = oAssg
                ops.append(oDoc)

            tDoc['opinion'] = ops
            analysis[str(i)] = tDoc
            i = i+1
            
    analysis = json.dumps(analysis)
    print(analysis)

app = Flask(__name__)

@app.route('/scrape', methods=['POST'])
def scrape():
    url = request.json.get('url')
    # headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    reviewEle = soup.findAll('span', {'class': 'review-text-content'})
    review = [i.text.replace("\n", '') for i in reviewEle]
    
    client = authenticate_client()
    analysis = sentiment_analysis(client, review)
    analysis = json.dumps(analysis)

    return analysis

@app.route('/optipick', methods=['GET', 'POST'])
def optipick():
    name = request.args.get('name')
    if not name:
        try:
            req_body = request.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return f"Hello, {name}. This HTTP triggered function executed successfully."
    else:
        return "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."

if __name__ == '__main__':
    app.run(debug=True)
