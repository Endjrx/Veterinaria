from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='homeini'),
    
    # APIs existentes
    path("api/mascotas/", views.api_mascotas, name="api_mascotas"),
    path("api/registrar/cliente-mascota/", views.registrar_cliente, name="api_cliente-mascota"),
    path("api/registrar/cita/", views.registrar_citas, name="registro_cita"),
    path("api/cargar-datos-agenda/", views.cargar_datos, name="carga_agenda"),
    
    # APIs CRUD completo
    path("api/detalle-mascota/<int:mascota_id>/", views.detalle_mascota, name="detalle_mascota"),
    path("api/editar-registro/", views.editar_registro, name="editar_registro"),
    path("api/eliminar-registro/<int:mascota_id>/", views.eliminar_registro, name="eliminar_registro"),
    
    # 💉 APIs VACUNACIÓN Y TRATAMIENTOS
    path("api/mascotas-selector/", views.api_mascotas_selector, name="api_mascotas_selector"),
    path("api/vacunas-mascota/<int:mascota_id>/", views.api_vacunas_mascota, name="api_vacunas_mascota"),
    path("api/tratamientos-mascota/<int:mascota_id>/", views.api_tratamientos_mascota, name="api_tratamientos_mascota"),
    path("api/registrar-vacuna/", views.registrar_vacuna, name="registrar_vacuna"),
    path("api/registrar-tratamiento/", views.registrar_tratamiento, name="registrar_tratamiento"),
    
    # 📊 APIs REPORTES Y FACTURAS
    path("api/resumen-facturas/", views.api_resumen_facturas, name="api_resumen_facturas"),
    path("api/listar-facturas/", views.api_listar_facturas, name="api_listar_facturas"),
    path("api/detalle-factura/<int:factura_id>/", views.api_detalle_factura, name="api_detalle_factura"),
    path("api/registrar-factura/", views.registrar_factura, name="registrar_factura"),
    path("api/actualizar-estado-factura/", views.actualizar_estado_factura, name="actualizar_estado_factura"),
    path("api/datos-factura/", views.api_datos_factura, name="api_datos_factura"),

    path('api/citas-mascota/<int:mascota_id>/', views.citas_mascota, name='citas_mascota'),
]