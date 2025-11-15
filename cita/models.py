from django.db import models
from mascota.models import Mascota
from empl_veterinario.models import Veterinario

# Create your models here.
class Cita(models.Model):
    PK_IdCita = models.IntegerField(primary_key=True, db_column='PK_IdCita')
    Fecha = models.DateField(db_column='Fecha')
    Hora = models.TimeField(db_column='Hora')
    Motivo = models.CharField(max_length=200, db_column='Motivo')
    Estado = models.CharField(max_length=50, db_column='Estado')
    FK_IdMascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, db_column='FK_IdMascota')
    FK_IdVeterinario = models.ForeignKey(Veterinario, on_delete=models.CASCADE, db_column='FK_IdVeterinario')

    class Meta:
        db_table = 'Cita'
