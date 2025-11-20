from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from pagRegister.models import Cliente, Mascota
import json

def consultar_clientes(request):
    """Vista principal para listar clientes y mascotas"""
    # Obtener todas las mascotas con sus clientes
    mascotas = Mascota.objects.select_related('cliente').all().order_by('-fecha_registro')
    
    # Preparar datos para el template
    registros = []
    for mascota in mascotas:
        registros.append({
            'id': mascota.id,
            'cliente_nombre': mascota.cliente.nombre,
            'cliente_apellido': mascota.cliente.apellido,
            'cliente_email': mascota.cliente.email,
            'cliente_telefono': mascota.cliente.telefono,
            'cliente_direccion': mascota.cliente.direccion,
            'mascota_nombre': mascota.nombre,
            'mascota_especie': mascota.especie,
            'mascota_raza': mascota.raza,
            'mascota_edad': mascota.edad,
            'mascota_peso': mascota.peso
        })
    
    context = {
        'registros': registros
    }
    return render(request, 'vet_consultar.html', context)


def buscar_registros(request):
    """API para búsqueda en tiempo real"""
    if request.method == 'GET':
        search_term = request.GET.get('q', '').strip()
        
        if search_term:
            # Buscar en mascotas y sus clientes relacionados
            mascotas = Mascota.objects.select_related('cliente').filter(
                nombre__icontains=search_term
            ) | Mascota.objects.select_related('cliente').filter(
                cliente__nombre__icontains=search_term
            ) | Mascota.objects.select_related('cliente').filter(
                cliente__apellido__icontains=search_term
            ) | Mascota.objects.select_related('cliente').filter(
                cliente__email__icontains=search_term
            ) | Mascota.objects.select_related('cliente').filter(
                cliente__telefono__icontains=search_term
            )
            mascotas = mascotas.distinct().order_by('-fecha_registro')
        else:
            mascotas = Mascota.objects.select_related('cliente').all().order_by('-fecha_registro')
        
        # Preparar respuesta JSON
        resultados = []
        for mascota in mascotas:
            resultados.append({
                'id': mascota.id,
                'cliente': {
                    'id': mascota.cliente.id,
                    'nombre': mascota.cliente.nombre,
                    'apellido': mascota.cliente.apellido,
                    'email': mascota.cliente.email,
                    'telefono': mascota.cliente.telefono,
                    'direccion': mascota.cliente.direccion
                },
                'mascota': {
                    'nombre': mascota.nombre,
                    'especie': mascota.especie,
                    'raza': mascota.raza,
                    'edad': float(mascota.edad),
                    'peso': float(mascota.peso)
                }
            })
        
        return JsonResponse({'registros': resultados})


def obtener_detalle(request, mascota_id):
    """API para obtener detalles de un registro"""
    mascota = get_object_or_404(Mascota.objects.select_related('cliente'), id=mascota_id)
    
    data = {
        'id': mascota.id,
        'cliente': {
            'id': mascota.cliente.id,
            'nombre': mascota.cliente.nombre,
            'apellido': mascota.cliente.apellido,
            'email': mascota.cliente.email,
            'telefono': mascota.cliente.telefono,
            'direccion': mascota.cliente.direccion
        },
        'mascota': {
            'nombre': mascota.nombre,
            'especie': mascota.especie,
            'raza': mascota.raza,
            'edad': float(mascota.edad),
            'peso': float(mascota.peso)
        }
    }
    
    return JsonResponse(data)


@require_http_methods(["POST"])
def actualizar_registro(request, mascota_id):
    """API para actualizar un registro"""
    try:
        mascota = get_object_or_404(Mascota.objects.select_related('cliente'), id=mascota_id)
        data = json.loads(request.body)
        
        # Actualizar cliente
        cliente = mascota.cliente
        cliente.nombre = data['cliente']['nombre']
        cliente.apellido = data['cliente']['apellido']
        cliente.email = data['cliente']['email']
        cliente.telefono = data['cliente']['telefono']
        cliente.direccion = data['cliente']['direccion']
        cliente.save()
        
        # Actualizar mascota
        mascota.nombre = data['mascota']['nombre']
        mascota.especie = data['mascota']['especie']
        mascota.raza = data['mascota']['raza']
        mascota.edad = data['mascota']['edad']
        mascota.peso = data['mascota']['peso']
        mascota.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Registro actualizado exitosamente'
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'Error al actualizar: {str(e)}'
        }, status=400)


@require_http_methods(["POST", "DELETE"])
def eliminar_registro(request, mascota_id):
    """API para eliminar un registro"""
    try:
        mascota = get_object_or_404(Mascota, id=mascota_id)
        cliente = mascota.cliente
        
        # Eliminar mascota
        mascota.delete()
        
        # Verificar si el cliente tiene más mascotas usando el related_name correcto
        if not cliente.mascotas.exists():
            cliente.delete()
        
        return JsonResponse({
            'success': True,
            'message': 'Registro eliminado exitosamente'
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'Error al eliminar: {str(e)}'
        }, status=400)