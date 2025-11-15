from django.db import models
from empleado.models import Empleado

# Create your models here.
class Veterinario(models.Model):
    PK_IdVeterinario = models.OneToOneField(Empleado, on_delete=models.CASCADE, primary_key=True, db_column='PK_IdVeterinario')
    Especialidad = models.CharField(max_length=100, db_column='Especialidad')
    Licencia = models.CharField(max_length=50, db_column='Licencia')

    class Meta:
        db_table = 'Veterinario'
