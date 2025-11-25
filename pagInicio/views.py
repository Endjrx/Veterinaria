from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from cita.models import Cita
from cliente.models import Cliente
from mascota.models import Mascota
from datetime import date
from django.http import JsonResponse
from empl_veterinario.models import Veterinario
from django.views.decorators.http import require_http_methods
import json

@login_required(login_url='home-login')
def home(request):

    cita = Cita.objects.filter(fecha=date.today())
    pacientes = Cliente.objects.count()
    contador_citas = Cita.objects.count()

    return render(request, 'pagInicio/vet_dashboard.html', {
        'total_citas_hoy': cita.count(),
        'total_clientes_activos': pacientes,
        'total_citas': contador_citas,
        'citas': cita
    })




#Funcion que se encargara de recoletar los datos de la bddd
def api_mascotas(request):
    mascotas = Mascota.objects.select_related ("cliente_id").all () #Se reciben los datos de las mascotas y clientes 

    data = [] #Se declara un array que almacenara datos en formado JSON

    for m in mascotas:
        data.append ({
            "id": m.id_mascota,
            "cliente": m.cliente_id.nombre,
            "email": m.cliente_id.email,
            "telefono": m.cliente_id.telefono,
            "mascota": m.nombre,
            "especie": m.especie
        })

    return JsonResponse ({"mascotas": data})





def registrar_cliente(request):
    if request.method == "POST":

        # 1. Obtener datos CLIENTE
        nombre = request.POST.get("nombre")
        apellido = request.POST.get("apellido")
        direccion = request.POST.get("direccion")
        email = request.POST.get("email")
        telefono = request.POST.get("telefono")

        # Crear cliente
        cliente = Cliente.objects.create(
            nombre=nombre,
            apellido=apellido,
            direccion=direccion,
            email=email,
            telefono=telefono
        )

        # 2. Obtener datos MASCOTA
        nombreMascota = request.POST.get("nombreMascota")
        especie = request.POST.get("especie")
        raza = request.POST.get("raza")
        edad = request.POST.get("edad")
        peso = request.POST.get("peso")

        Mascota.objects.create(
            nombre=nombreMascota,
            especie=especie,
            raza=raza,
            edad=edad,
            peso=peso,
            cliente_id=cliente
        )

        # 3. Respuesta JSON
        return JsonResponse({"status": "ok", "message": "Registro creado correctamente"})

    return JsonResponse({"status": "error", "message": "Método no permitido"}, status=400)  






def registrar_citas (request):
    if request.method == "POST":

        fecha = request.POST.get("fecha")
        hora = request.POST.get("hora")
        motivo = request.POST.get("motivo")
        estado = request.POST.get("estado")

        mascota_id = request.POST.get("mascota")
        veterinario_id = request.POST.get("veterinario")

        # Obtener objetos
        try:
            mascota = Mascota.objects.get(id_mascota=mascota_id)
            veterinario = Veterinario.objects.get(id_veterinario=veterinario_id)
        except:
            return JsonResponse({"status": "error", "message": "Mascota o veterinario no válido"}, status=400)

        # Crear la cita
        Cita.objects.create(
            fecha=fecha,
            hora=hora,
            motivo=motivo,
            estado=estado,
            mascota_id=mascota,
            veterinario_id=veterinario
        )

        return JsonResponse({"status": "ok", "message": "Cita creada correctamente"})

    return JsonResponse({"status": "error", "message": "Método no permitido"}, status=400)



#Funcion auxiliar que ayudara a cargar los veterinarios y mascotas disponibles en la BDD para las agendas, se encarga de enviar los datos a una URL de transferencia.
def cargar_datos(request):

    # 1. MASCOTAS
    mascotas = list(Mascota.objects.all().values(
        "id_mascota",
        "nombre",
        "especie"
    ))

    # 2. VETERINARIOS con datos del empleado
    veterinarios_data = []
    veterinarios = Veterinario.objects.select_related("id_veterinario").all()

    for vet in veterinarios:
        veterinarios_data.append({
            "id": vet.id_veterinario.pk,             # ID del empleado
            "nombre": vet.id_veterinario.nombre,
            "apellido": vet.id_veterinario.apellido
        })

    return JsonResponse({
        "mascotas": mascotas,
        "veterinarios": veterinarios_data
    })




# ============================================
# 🔍 FUNCIÓN VER DETALLES - Obtiene info completa de cliente y mascota
# ============================================
def detalle_mascota(request, mascota_id):
    try:
        mascota = Mascota.objects.select_related("cliente_id").get(id_mascota=mascota_id)
        
        detalle = {
            # Datos del cliente
            "cliente_id": mascota.cliente_id.id_cliente,
            "cliente_nombre": mascota.cliente_id.nombre,
            "cliente_apellido": mascota.cliente_id.apellido,
            "cliente_direccion": mascota.cliente_id.direccion,
            "cliente_email": mascota.cliente_id.email,
            "cliente_telefono": mascota.cliente_id.telefono,
            
            # Datos de la mascota
            "mascota_id": mascota.id_mascota,
            "mascota_nombre": mascota.nombre,
            "mascota_especie": mascota.especie,
            "mascota_raza": mascota.raza,
            "mascota_edad": mascota.edad,
            "mascota_peso": float(mascota.peso) if mascota.peso else 0
        }
        
        return JsonResponse({"status": "ok", "detalle": detalle})
    
    except Mascota.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Mascota no encontrada"}, status=404)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)




# ============================================
# ✏️ FUNCIÓN EDITAR - Actualiza cliente y mascota
# ============================================
def editar_registro(request):
    if request.method == "POST":
        try:
            # IDs de cliente y mascota
            cliente_id = request.POST.get("clienteId")
            mascota_id = request.POST.get("mascotaId")
            
            # Obtener objetos
            cliente = Cliente.objects.get(id_cliente=cliente_id)
            mascota = Mascota.objects.get(id_mascota=mascota_id)
            
            # Actualizar CLIENTE
            cliente.nombre = request.POST.get("nombre")
            cliente.apellido = request.POST.get("apellido")
            cliente.direccion = request.POST.get("direccion")
            cliente.email = request.POST.get("email")
            cliente.telefono = request.POST.get("telefono")
            cliente.save()
            
            # Actualizar MASCOTA
            mascota.nombre = request.POST.get("nombreMascota")
            mascota.especie = request.POST.get("especie")
            mascota.raza = request.POST.get("raza")
            mascota.edad = request.POST.get("edad")
            mascota.peso = request.POST.get("peso")
            mascota.save()
            
            return JsonResponse({"status": "ok", "message": "Registro actualizado correctamente"})
        
        except Cliente.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Cliente no encontrado"}, status=404)
        except Mascota.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Mascota no encontrada"}, status=404)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    
    return JsonResponse({"status": "error", "message": "Método no permitido"}, status=400)




# ============================================
# 🗑️ FUNCIÓN ELIMINAR EN CASCADA
# Elimina: Cliente → Mascota → Citas asociadas
# NO elimina de tablas que no existen (historial_de_Vacunas)
# ============================================
@require_http_methods(["DELETE"])
def eliminar_registro(request, mascota_id):
    try:
        # Obtener la mascota
        mascota = Mascota.objects.select_related("cliente_id").get(id_mascota=mascota_id)
        
        # Obtener el cliente asociado
        cliente = mascota.cliente_id
        
        # PASO 1: Eliminar todas las citas asociadas a esta mascota
        citas_eliminadas = Cita.objects.filter(mascota_id=mascota).delete()
        
        # PASO 2: Verificar si el cliente tiene otras mascotas
        otras_mascotas = Mascota.objects.filter(cliente_id=cliente).exclude(id_mascota=mascota_id).count()
        
        # PASO 3: Eliminar la mascota (sin usar CASCADE automático)
        # Guardamos info antes de eliminar
        nombre_mascota = mascota.nombre
        
        # Eliminamos manualmente la mascota para evitar CASCADE a tablas inexistentes
        mascota_eliminada = mascota.delete()
        
        # PASO 4: Si el cliente no tiene más mascotas, eliminarlo también
        if otras_mascotas == 0:
            cliente.delete()
            mensaje = f"✅ Cliente, mascota '{nombre_mascota}' y citas asociadas eliminados correctamente"
        else:
            mensaje = f"✅ Mascota '{nombre_mascota}' y citas eliminadas. El cliente tiene {otras_mascotas} mascota(s) más registrada(s)"
        
        return JsonResponse({
            "status": "ok", 
            "message": mensaje,
            "citas_eliminadas": citas_eliminadas[0] if citas_eliminadas[0] > 0 else 0
        })
    
    except Mascota.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Mascota no encontrada"}, status=404)
    except Exception as e:
        # Capturamos cualquier error de BD y lo reportamos de manera amigable
        error_msg = str(e)
        if "doesn't exist" in error_msg or "no existe" in error_msg:
            return JsonResponse({
                "status": "error", 
                "message": "Error: Existe una referencia a una tabla que no está disponible. Contacta al administrador."
            }, status=500)
        return JsonResponse({"status": "error", "message": f"Error al eliminar: {error_msg}"}, status=500)