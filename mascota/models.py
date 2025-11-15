from django.db import models
from cliente.models import Cliente

# Create your models here.
class Mascota(models.Model):
    PK_IdMascota = models.IntegerField(primary_key=True, db_column='PK_IdMascota')
    Nombre = models.CharField(max_length=50, db_column='Nombre')
    Especie = models.CharField(max_length=50, db_column='Especie')
    Raza = models.CharField(max_length=50, db_column='Raza')
    Edad = models.IntegerField(db_column='Edad')
    Peso = models.DecimalField(max_digits=5, decimal_places=2, db_column='Peso')
    FK_IdCliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='FK_IdCliente')

    class Meta:
        db_table = 'Mascota'
