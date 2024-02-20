import azure.functions as func
import logging
import requests
from bs4 import BeautifulSoup
# from azure.ai.textanalytics import TextAnalyticsClient
# from azure.core.credentials import AzureKeyCredential
# import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# def authenticate_client():
#     language_key = '9dbfb5dbd09940fa87b596dfac51ca40'
#     language_endpoint = 'https://faqtest.cognitiveservices.azure.com/'
#     ta_credential = AzureKeyCredential(language_key)
#     text_analytics_client = TextAnalyticsClient(
#             endpoint=language_endpoint, 
#             credential=ta_credential)
#     return text_analytics_client

@app.route(route="scrape")
def scrape(req: func.HttpRequest) -> func.HttpResponse:
    url = req.get_json().get('url')
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    reviewEle = soup.findAll('span', {'class': 'review-text-content'})
    review = [i.text.replace("\n", '') for i in reviewEle]

    return func.HttpResponse(f"Recieved {soup}")    


@app.route(route="optipick")
def optipick(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return func.HttpResponse(f"Hello, {name}. This HTTP triggered function executed successfully.")
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
             status_code=200
        )