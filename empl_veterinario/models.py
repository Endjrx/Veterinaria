from django.db import models
from empleado.models import Empleado

# Create your models here.
class Veterinario(models.Model):
    id_veterinario = models.OneToOneField(Empleado, on_delete=models.CASCADE, primary_key=True, db_column='id_veterinario')
    especialidad = models.CharField(max_length=100, db_column='especialidad')

    class Meta:
        db_table = 'veterinario'
