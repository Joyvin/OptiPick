import requests
from bs4 import BeautifulSoup
import json


url = "https://www.amazon.in/Colgate-Toothpaste-Visible-White-Sparkling/dp/B00I6F64T2/"
response = requests.get(url, headers={
    "User-Agent": "*"
})
response.raise_for_status()
soup = BeautifulSoup(response.text, 'html.parser')

ele = soup.find('span', {'id': 'productTitle'}).text.strip()
img = soup.find('img', {'id': 'landingImage'}).get('src')

print(img)