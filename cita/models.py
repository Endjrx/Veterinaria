from django.db import models
from mascota.models import Mascota
from empl_veterinario.models import Veterinario

# Create your models here.
class Cita(models.Model):

    ESTADOS = [
        ('Pendiente', 'Pendiente'),
        ('Confirmada', 'Confirmada'),
        ('Programada', 'Programada'),
        ('Atendida', 'Atendida'),
        ('Cancelada', 'Cancelada'),
    ]

    id_cita = models.BigAutoField(primary_key=True, db_column='id_cita')
    fecha = models.DateField(db_column='fecha')
    hora = models.TimeField(db_column='hora')
    motivo = models.CharField(max_length=200, db_column='motivo')
    estado = models.CharField(max_length=50, choices=ESTADOS, db_column='estado')
    mascota_id = models.ForeignKey(Mascota, on_delete=models.CASCADE, db_column='mascota_id')
    veterinario_id = models.ForeignKey(Veterinario, on_delete=models.CASCADE, db_column='veterinario_id')

    class Meta:
        db_table = 'cita'
