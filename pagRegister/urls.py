from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('registro/', views.registro_cliente_mascota, name='registro_cliente_mascota'),
    path('clientes/', views.lista_clientes, name='lista_clientes'),
]