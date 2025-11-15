from django.db import models
from empleado.models import Empleado

# Create your models here.
class Administrador(models.Model):
    PK_IdAdministrador = models.OneToOneField(Empleado, on_delete=models.CASCADE, primary_key=True, db_column='PK_IdAdministrador')
    Licencia = models.CharField(max_length=50, db_column='Licencia')

    class Meta:
        db_table = 'Administrador'
