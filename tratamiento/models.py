from django.db import models
from cita.models import Cita

# Create your models here.
class Tratamiento(models.Model):
    id_tratamiento = models.BigAutoField(primary_key=True, db_column='id_tratamiento')
    descripcion = models.CharField(max_length=200, db_column='descripcion')
    medicamento = models.CharField(max_length=100, db_column='medicamento')
    dosis = models.CharField(max_length=50, db_column='dosis')
    duracion = models.CharField(max_length=50, db_column='duracion')
    fecha_inicio = models.DateField(db_column='fecha_inicio')
    cita_id = models.ForeignKey(Cita, on_delete=models.CASCADE, db_column='cita_id')

    class Meta:
        db_table = 'tratamiento'
