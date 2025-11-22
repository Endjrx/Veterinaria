from django.urls import path
from . import views

urlpatterns = [
    path ('', views.home, name='homeini'),
    path("api/mascotas/", views.api_mascotas, name="api_mascotas"),
]