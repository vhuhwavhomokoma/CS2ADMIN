from django.contrib import admin
from django.urls import path
from uploadfile.views import *
 
urlpatterns = [
    path('request/',StudentUploads.as_view(), name = "uploadedfiles" ),
   
]
