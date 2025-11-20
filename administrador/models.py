from django.db import models
from django.contrib.auth.models import User
from empleado.models import Empleado

# Create your models here.
class Administrador(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, db_column='id_administrador')
    Telefono = models.CharField(max_length=20, db_column='telefono')


    class Meta:
        db_table = 'administrador'