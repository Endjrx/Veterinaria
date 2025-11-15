from django.db import models
from mascota.models import Mascota

# Create your models here.
class Historial_de_Vacunas(models.Model):
    PK_IdVacuna = models.IntegerField(primary_key=True, db_column='PK_IdVacuna')
    Nombre_Vacuna = models.CharField(max_length=100, db_column='Nombre_Vacuna')
    Fecha_Aplic = models.DateField(db_column='Fecha_Aplic')
    Fecha_Venc = models.DateField(db_column='Fecha_Venc')
    Lote = models.CharField(max_length=50, db_column='Lote')
    FK_IdMascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, db_column='FK_IdMascota')

    class Meta:
        db_table = 'Historial_de_Vacunas'
