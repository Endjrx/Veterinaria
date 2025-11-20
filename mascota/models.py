from django.db import models
from cliente.models import Cliente

# Create your models here.
class Mascota(models.Model):
    id_mascota = models.BigAutoField(primary_key=True, db_column='id_mascota')
    nombre = models.CharField(max_length=50, db_column='nombre')
    especie = models.CharField(max_length=50, db_column='especie')
    raza = models.CharField(max_length=50, db_column='raza')
    edad = models.IntegerField(db_column='edad')
    peso = models.DecimalField(max_digits=5, decimal_places=2, db_column='peso')
    cliente_id = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='cliente_id')

    class Meta:
        db_table = 'mascota'
