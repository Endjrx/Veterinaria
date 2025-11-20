from django.urls import path
from . import views

app_name = 'pagConsultar'

urlpatterns = [
    path('consultar/', views.consultar_clientes, name='consultar_clientes'),
    path('api/buscar/', views.buscar_registros, name='buscar_registros'),
    path('api/detalle/<int:mascota_id>/', views.obtener_detalle, name='obtener_detalle'),
    path('api/actualizar/<int:mascota_id>/', views.actualizar_registro, name='actualizar_registro'),
    path('api/eliminar/<int:mascota_id>/', views.eliminar_registro, name='eliminar_registro'),
]