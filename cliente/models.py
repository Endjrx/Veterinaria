from django.db import models

# Create your models here.
class Cliente(models.Model):
    
    PK_IdCliente = models.IntegerField(primary_key=True, db_column='PK_IdCliente')
    Nombre = models.CharField(max_length=50, db_column='Nombre')
    Apellido = models.CharField(max_length=50, db_column='Apellido')
    Telefono = models.CharField(max_length=20, db_column='Telefono')
    Direccion = models.CharField(max_length=150, db_column='Direccion')
    E_Mail = models.CharField(max_length=100, db_column='E-Mail')

    class Meta:
        db_table = 'Cliente'
