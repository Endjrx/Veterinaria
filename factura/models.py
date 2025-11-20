from django.db import models
from cliente.models import Cliente
from administrador.models import Administrador
from cita.models import Cita

# Create your models here.
class Factura(models.Model):
    
    id_factura = models.BigAutoField(primary_key=True, db_column='id_factura')
    fecha_emision = models.DateField(db_column='fecha_emision')
    monto_total = models.DecimalField(max_digits=10, decimal_places=2, db_column='monto_total')
    estado_pago = models.CharField(max_length=50, db_column='estado_pago')
    cita_id = models.ForeignKey(Cita, on_delete=models.CASCADE, db_column='cita_id')
    administrador_id = models.ForeignKey(Administrador, on_delete=models.CASCADE, db_column='administrador_id')
    cliente_id = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='cliente_id')

    class Meta:
        db_table = 'factura'
