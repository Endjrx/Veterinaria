from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='homeini'),
    
    # APIs existentes
    path("api/mascotas/", views.api_mascotas, name="api_mascotas"),
    path("api/registrar/cliente-mascota/", views.registrar_cliente, name="api_cliente-mascota"),
    path("api/registrar/cita/", views.registrar_citas, name="registro_cita"),
    path("api/cargar-datos-agenda/", views.cargar_datos, name="carga_agenda"),
    
    # ✨ Nuevas APIs para CRUD completo
    path("api/detalle-mascota/<int:mascota_id>/", views.detalle_mascota, name="detalle_mascota"),
    path("api/editar-registro/", views.editar_registro, name="editar_registro"),
    path("api/eliminar-registro/<int:mascota_id>/", views.eliminar_registro, name="eliminar_registro"),
]