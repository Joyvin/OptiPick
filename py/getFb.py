import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


cred = credentials.Certificate('/Users/alvindsouza/Documents/Projects/OptiPick/web/src/app/api/cred.json')

firebase_admin.initialize_app(cred)

db = firestore.client()
collection_ref = db.collection('users')

def getUserHistory():
    userId = "2uSQXCJkD2XpFrKkJBvFLMYDJHn2"
    collection_ref = db.collection('users').document(userId).collection('history')
    docs = collection_ref.get()
    res = [doc.to_dict() for doc in docs]
    return {"res": res}

print(getUserHistory())