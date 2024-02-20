import requests
from bs4 import BeautifulSoup
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

client = authenticate_client()

products = ["toothpaste", "toothbrush", "mouth wash", "Dental floss", "Teeth whitening products"]
asins = ['B0BSXNKKBD', 'B09RQSG1RW', 'B0CLY4DSMK', 'B0C5RLC1QJ', 'B0C9ZYZLKF', 'B09S6SK216', 'B0CFHMTLDT', 'B0BNMM9246', 'B07VB2WY7F', 'B0CLY4DSMK', 'B0B37W3BXR', 'B0BZPMKWG9', 'B0B4S5TX86', 'B0BJ7BW53L', 'B0CD7G9443', 'B0BRV3GWD5', 'B0CQTSHK4L', 'B0BMFBMCWS', 'B0BWJS2K8M', 'B0BSXNTHZD', 'B0CNXGY4BW', 'B0736SWPPQ', 'B0CD7G9443', 'B0BNMM9246', 'B09RQSG1RW', 'B07QLZXL8J', 'B0BSXNKKBD', 'B0CQK8L121', 'B0B5TC4GJQ', 'B0BNKVGDSF', 'B0BJVNG9YR', 'B083D43XM6', 'B08CBBDWWR', 'B08CVQSL21', 'B0CFFWR7PL', 'B0BZQ731TJ', 'B08BD4W4GC', 'B0BS5JD8HP', 'B08T89QJLJ', 'B08F2HH1N1', 'B0BGZNVC3X', 'B0BVKND96Y', 'B097JY56XB', 'B0BJQL24WP', 'B0BNX4VJRX', 'B0CFHH6932', 'B0BH41KG16', 'B0736SWPPQ', 'B0BVVY3JZP', 'B0CKLPLGZX', 'B0BSR5RDH6', 'B0BW8S4GB9', 'B07NCMS751', 'B0CP21FGH6', 'B08QJH5GB6', 'B0CMM986P3', 'B0BMFBMCWS', 'B0C9ZYZLKF', 'B0BWTYWVH7', 'B0CGZ39S12']

for i in asins:
    response = requests.get(f"https://www.amazon.in/product-review/{i}")
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    reviewEle = soup.findAll('span', {'class': 'review-text-content'})
    with open('./data/whitening.txt', 'a') as f:
        [f.write(j.text.replace("\n", '') + '\n') for j in reviewEle]
    print(f"Wrote {i}")


# sentiment_analysis(client, review)