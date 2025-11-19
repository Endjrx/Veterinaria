from django.db import models
from mascota.models import Mascota

# Create your models here.
class Historial_de_Vacunas(models.Model):
    id_vacuna = models.BigAutoField(primary_key=True, db_column='id_vacuna')
    nombre_vacuna = models.CharField(max_length=100, db_column='nombre_vacuna')
    fecha_aplic = models.DateField(db_column='fecha_aplic')
    fecha_venc = models.DateField(db_column='fecha_venc')
    lote = models.CharField(max_length=50, db_column='lote')
    mascota_id = models.ForeignKey(Mascota, on_delete=models.CASCADE, db_column='mascota_id')

    class Meta:
        db_table = 'historial_de_Vacunas'
