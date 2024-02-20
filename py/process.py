from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
import requests
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
import json
import httpx

language_key = "9dbfb5dbd09940fa87b596dfac51ca40"
language_endpoint = "https://faqtest.cognitiveservices.azure.com/"

app = FastAPI()

origins = [
    "*",  # Allow localhost for development
]


class Item(BaseModel):
    url: Optional[str] = None


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# def authenticate_client():
#     ta_credential = AzureKeyCredential(language_key)
#     text_analytics_client = TextAnalyticsClient(
#         endpoint=language_endpoint, credential=ta_credential
#     )
#     return text_analytics_client


# def sentiment_analysis(client, documents):
#     result = client.analyze_sentiment(documents, show_opinion_mining=True)
#     doc_result = [doc for doc in result if not doc.is_error]

#     analysis = {}
#     i = 0

#     for document in doc_result:
#         for sentence in document.sentences:
#             tDoc = {}
#             tDoc["sentence"] = sentence.text
#             tDoc["isPositive"] = sentence.confidence_scores.positive
#             tDoc["isNegative"] = sentence.confidence_scores.negative
#             tDoc["isNeutral"] = sentence.confidence_scores.neutral
#             ops = []
#             for mined_opinion in sentence.mined_opinions:
#                 oDoc = {}
#                 oDoc["target"] = mined_opinion.target.text
#                 oAssg = []
#                 for assessment in mined_opinion.assessments:
#                     aDoc = {}
#                     aDoc["value"] = assessment.text
#                     aDoc["sentiment"] = assessment.sentiment
#                     aDoc["score"] = (
#                         assessment.confidence_scores.positive
#                         if assessment.confidence_scores.positive
#                         > assessment.confidence_scores.negative
#                         else assessment.confidence_scores.negative
#                     )
#                     oAssg.append(aDoc)
#                 oDoc["assessment"] = oAssg
#                 ops.append(oDoc)

#             tDoc["opinion"] = ops
#             analysis[str(i)] = tDoc
#             i = i + 1

#     analysis = json.dumps(analysis)
#     print(analysis)


@app.post("/scrape")
async def scrape(item: Item):
    if item.url is None:
        raise HTTPException(status_code=400, detail="URL not provided")
    print(f"Scraping {item.url}")

    async with httpx.AsyncClient() as client:
        response = await client.get(f"http://localhost:3000/endpoint?url={item.url}")
    result = response.text
    print(result)

    return {"message": f"Scraping {item.url}", "data": result}
    # Your scraping logic here

    # soup = BeautifulSoup(response.text, "html.parser")
    # print(soup)
    # Assuming 'result' is the output of your scraping logic


# return analysis


# @app.get("/optipick")
# @app.post("/optipick")
# async def optipick(request: Request):
#     data = await request.json()
#     name = data.get("name")

#     if name:
#         return f"Hello, {name}. This HTTP triggered function executed successfully."
#     else:
#         return "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
