from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import transaction
from .models import Cliente, Mascota
from .forms import ClienteForm, MascotaForm

def registro_cliente_mascota(request):
    if request.method == 'POST':
        cliente_form = ClienteForm(request.POST)
        mascota_form = MascotaForm(request.POST)
        
        if cliente_form.is_valid() and mascota_form.is_valid():
            try:
                with transaction.atomic():
                    # Guardar cliente
                    cliente = cliente_form.save()
                    
                    # Guardar mascota asociada al cliente
                    mascota = mascota_form.save(commit=False)
                    mascota.cliente = cliente
                    mascota.save()
                    
                    messages.success(request, f'✅ Registro exitoso! Cliente: {cliente.nombre} {cliente.apellido} - Mascota: {mascota.nombre}')
                    return redirect('registro_cliente_mascota')
            except Exception as e:
                messages.error(request, f'❌ Error al registrar: {str(e)}')
        else:
            messages.error(request, '❌ Por favor corrija los errores en el formulario')
    else:
        cliente_form = ClienteForm()
        mascota_form = MascotaForm()
    
    context = {
        'cliente_form': cliente_form,
        'mascota_form': mascota_form,
    }
    return render(request, 'pagRegister/vet_register.html', context)


def lista_clientes(request):
    clientes = Cliente.objects.all().prefetch_related('mascotas')
    context = {
        'clientes': clientes
    }
    return render(request, 'pagRegister/vet_register.html', context)


def dashboard(request):
    total_clientes = Cliente.objects.count()
    total_mascotas = Mascota.objects.count()
    
    context = {
        'total_clientes': total_clientes,
        'total_mascotas': total_mascotas,
    }
    return render(request, 'pagRegister/vet_register.html', context)