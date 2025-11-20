from django.db import models

# Create your models here.
class Cliente(models.Model):

    ESTADOS = [
        ('Activo', 'Activo'),
        ('Inactivo', 'Inactivo'),
    ]
    
    id_cliente = models.BigAutoField(primary_key=True, db_column='id_cliente')
    nombre = models.CharField(max_length=50, db_column='nombre')
    apellido = models.CharField(max_length=50, db_column='apellido')
    telefono = models.CharField(max_length=20, db_column='telefono')
    direccion = models.CharField(max_length=150, db_column='direccion')
    email = models.CharField(max_length=100, db_column='email')
    estado = models.CharField(max_length=20, choices=ESTADOS, default='Activo', db_column='estado')

    class Meta:
        db_table = 'cliente'
