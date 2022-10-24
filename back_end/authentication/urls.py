from django.urls import path
from knox import views as knox_views

from authentication.views import Authentications,User
from . import *

urlpatterns = [
    path('user/', Authentications.get_user),
    path('login/', Authentications.login),
    path('register/', Authentications.register),
    path('logout/', Authentications.logout, name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall')
]