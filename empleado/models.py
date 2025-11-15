from django.db import models

# Create your models here.
class Empleado(models.Model):

    PK_IdEmpleado = models.IntegerField (primary_key=True, db_column='PK_IdEmpleado')
    Nombre = models.CharField (max_length=50, db_column='Nombre')
    Apellido = models.CharField (max_length=50, db_column='Apellido')
    Telefono = models.CharField(max_length=20, db_column='Telefono')

    class Meta:
        db_table = 'Empleado'  
