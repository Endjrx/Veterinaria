from django.contrib import admin
from .models import Cliente, Mascota

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'apellido', 'email', 'telefono', 'fecha_registro']
    search_fields = ['nombre', 'apellido', 'email']
    list_filter = ['fecha_registro']


@admin.register(Mascota)
class MascotaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'especie', 'raza', 'edad', 'peso', 'cliente', 'fecha_registro']
    search_fields = ['nombre', 'raza', 'cliente__nombre']
    list_filter = ['especie', 'fecha_registro']
    autocomplete_fields = ['cliente']