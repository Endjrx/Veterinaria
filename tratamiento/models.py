from django.db import models
from cita.models import Cita

# Create your models here.
class Tratamiento(models.Model):
    PK_IdTratamiento = models.IntegerField(primary_key=True, db_column='PK_IdTratamiento')
    Descripcion = models.CharField(max_length=200, db_column='Descripcion')
    Medicamento = models.CharField(max_length=100, db_column='Medicamento')
    Dosis = models.CharField(max_length=50, db_column='Dosis')
    Duracion = models.CharField(max_length=50, db_column='Duracion')
    Fecha_Inicio = models.DateField(db_column='Fecha_Inicio')
    FK_IdCita = models.ForeignKey(Cita, on_delete=models.CASCADE, db_column='FK_IdCita')

    class Meta:
        db_table = 'Tratamiento'
