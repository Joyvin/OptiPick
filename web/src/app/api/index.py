import requests
from bs4 import BeautifulSoup
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
import json

from flask import Flask, request

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
    # print(doc_result)

    # positive_reviews = [doc for doc in doc_result if doc.sentiment == "positive"]
    # negative_reviews = [doc for doc in doc_result if doc.sentiment == "negative"]

    # positive_mined_opinions = []
    # mixed_mined_opinions = []
    # negative_mined_opinions = []

    for document in doc_result:
        # print("Document Sentiment: {}".format(document.sentiment))
        # print("Overall scores: positive={0:.2f}; neutral={1:.2f}; negative={2:.2f} \n".format(
        #     document.confidence_scores.positive,
        #     document.confidence_scores.neutral,
        #     document.confidence_scores.negative,
        # ))
        for sentence in document.sentences:
            tDoc = {}
            tDoc['sentence'] = sentence.text
            tDoc['isPositive'] = sentence.confidence_scores.positive
            tDoc['isNegative'] = sentence.confidence_scores.negative
            tDoc['isNeutral'] = sentence.confidence_scores.neutral

            # print("Sentence: {}".format(sentence.text))
            # print("Sentence sentiment: {}".format(sentence.sentiment))
            # print("Sentence score:\nPositive={0:.2f}\nNeutral={1:.2f}\nNegative={2:.2f}\n".format(
            #     sentence.confidence_scores.positive,
            #     sentence.confidence_scores.neutral,
            #     sentence.confidence_scores.negative,
            # ))
            ops = []
            for mined_opinion in sentence.mined_opinions:
                oDoc = {}
                oDoc['target'] = mined_opinion.target.text
                # target = mined_opinion.target
                # print("......'{}' target '{}'".format(target.sentiment, target.text))
                # print("......Target score:\n......Positive={0:.2f}\n......Negative={1:.2f}\n".format(
                #     target.confidence_scores.positive,
                #     target.confidence_scores.negative,
                # ))
                oAssg = []
                for assessment in mined_opinion.assessments:
                    aDoc = {}
                    aDoc['value'] = assessment.text
                    aDoc['sentiment'] = assessment.sentiment
                    aDoc['score'] = assessment.confidence_scores.positive if assessment.confidence_scores.positive > assessment.confidence_scores.negative else assessment.confidence_scores.negative
                    # print("......'{}' assessment '{}'".format(assessment.sentiment, assessment.text))
                    # print("......Assessment score:\n......Positive={0:.2f}\n......Negative={1:.2f}\n".format(
                    #     assessment.confidence_scores.positive,
                    #     assessment.confidence_scores.negative,
                    # ))
                    oAssg.append(aDoc)
                oDoc['assessment'] = oAssg
                ops.append(oDoc)

            tDoc['opinion'] = ops
            analysis[str(i)] = tDoc
            i = i+1
            
        #     print("\n")
        # print("\n")

    analysis = json.dumps(analysis)
    print(analysis)

app = Flask(__name__)

@app.route('/api/helloj')
def hello():
    return "helloj"

@app.route('/api/scrape', methods=['POST'])
def scrape():
    client = authenticate_client()

    url = request.form.get('url')
    url.replace('/dp/', '/product-reviews/')

    headers = {
                'User-Agent': 'Your User Agent Here',
            }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    reviewEle = soup.findAll('span', {'class': 'review-text-content'})
    review = [i.text.replace("\n", '') for i in reviewEle]
    # return str(review)

    analysis = sentiment_analysis(client, review)
    analysis = json.dumps(analysis)

    return analysis


if __name__ == '__main__':
    app.run()
