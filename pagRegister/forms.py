from django import forms
from .models import Cliente, Mascota

class ClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['nombre', 'apellido', 'direccion', 'email', 'telefono']
        widgets = {
            'nombre': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nombre del cliente'
            }),
            'apellido': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Apellido del cliente'
            }),
            'direccion': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Dirección completa'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'ejemplo@email.com'
            }),
            'telefono': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Teléfono de contacto'
            }),
        }


class MascotaForm(forms.ModelForm):
    class Meta:
        model = Mascota
        fields = ['nombre', 'especie', 'raza', 'edad', 'peso']
        widgets = {
            'nombre': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nombre de la mascota'
            }),
            'especie': forms.Select(attrs={
                'class': 'form-control'
            }),
            'raza': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Raza de la mascota'
            }),
            'edad': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': 'Edad en años',
                'step': '0.5',
                'min': '0'
            }),
            'peso': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': 'Peso en kg',
                'step': '0.1',
                'min': '0'
            }),
        }