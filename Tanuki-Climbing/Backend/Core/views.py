# core/views.py
from django.shortcuts import render
from firebase_admin import firestore
import firebase_admin

# Initialize Firebase Firestore
db = firestore.client()

def firebase_test(request):
    # Fetch a test collection or document from Firestore
    test_doc = db.collection('testCollection').document('testDocument').get()
    
    # Check if the document exists
    if test_doc.exists:
        data = test_doc.to_dict()
    else:
        data = {"message": "Test document not found"}
    
    return render(request, 'core/firebase_test.html', {"data": data})

# Index view function
def index(request):
    return render(request, 'core/index.html')

