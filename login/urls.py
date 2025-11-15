from django.urls import path
from . import views

urlpatterns = [
    path ('', views.print , name = 'home-login')
]