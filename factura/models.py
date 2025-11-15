from django.db import models
from cliente.models import Cliente
from administrador.models import Administrador
from cita.models import Cita

# Create your models here.
class Factura(models.Model):
    PK_IdFactura = models.IntegerField(primary_key=True, db_column='PK_IdFactura')
    Fecha_Emision = models.DateField(db_column='Fecha_Emision')
    Monto_Total = models.DecimalField(max_digits=10, decimal_places=2, db_column='Monto_Total')
    Estado_Pago = models.CharField(max_length=50, db_column='Estado_Pago')
    FK_IdCita = models.ForeignKey(Cita, on_delete=models.CASCADE, db_column='FK_IdCita')
    FK_IdAdministrador = models.ForeignKey(Administrador, on_delete=models.CASCADE, db_column='FK_IdAdministrador')
    FK_IdCliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='FK_IdCliente')

    class Meta:
        db_table = 'Factura'
