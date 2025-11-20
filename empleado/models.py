from django.db import models

# Create your models here.
class Empleado(models.Model):

    id_empleado = models.BigAutoField (primary_key=True, db_column='id_empleado')
    nombre = models.CharField (max_length=50, db_column='nombre')
    apellido = models.CharField (max_length=50, db_column='apellido')
    telefono = models.CharField(max_length=20, db_column='telefono')

    class Meta:
        db_table = 'empleado'  
