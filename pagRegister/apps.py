from django.apps import AppConfig

class PagregisterConfig(AppConfig):  # 👈 Nombre de la clase (puede ser cualquiera)
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pagRegister'  # 👈 Este DEBE ser exactamente el nombre de la carpetas