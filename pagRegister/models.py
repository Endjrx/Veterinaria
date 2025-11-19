from django.db import models

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    direccion = models.TextField()
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    
    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        ordering = ['-fecha_registro']


class Mascota(models.Model):
    ESPECIES = [
        ('Perro', 'Perro'),
        ('Gato', 'Gato'),
        ('Ave', 'Ave'),
        ('Conejo', 'Conejo'),
        ('Otro', 'Otro'),
    ]
    
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='mascotas')
    nombre = models.CharField(max_length=100)
    especie = models.CharField(max_length=20, choices=ESPECIES)
    raza = models.CharField(max_length=100)
    edad = models.DecimalField(max_digits=4, decimal_places=1)  # Edad en años
    peso = models.DecimalField(max_digits=5, decimal_places=2)  # Peso en kg
    fecha_registro = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.nombre} - {self.especie}"
    
    class Meta:
        verbose_name = "Mascota"
        verbose_name_plural = "Mascotas"
        ordering = ['-fecha_registro']