from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('firebase-test/', views.firebase_test, name='firebase_test'),
]
    