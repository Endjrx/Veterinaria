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
from django.contrib.auth import get_user_model




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
        try:
            # 1. Obtener datos CLIENTE
            nombre = request.POST.get("nombre")
            apellido = request.POST.get("apellido")
            direccion = request.POST.get("direccion")
            email = request.POST.get("email")
            telefono = request.POST.get("telefono")

            # 2. Obtener datos MASCOTA
            nombreMascota = request.POST.get("nombreMascota")
            especie = request.POST.get("especie")
            raza = request.POST.get("raza")
            edad = request.POST.get("edad")
            peso = request.POST.get("peso")

            # ✅ VALIDACIÓN: Verificar que edad y peso no sean negativos
            try:
                edad_int = int(edad)
                peso_float = float(peso)
                
                if edad_int < 0:
                    return JsonResponse({
                        "status": "error", 
                        "message": "La edad no puede ser negativa"
                    }, status=400)
                
                if peso_float < 0:
                    return JsonResponse({
                        "status": "error", 
                        "message": "El peso no puede ser negativo"
                    }, status=400)
                
                # Validación adicional: valores razonables
                if edad_int > 50:
                    return JsonResponse({
                        "status": "error", 
                        "message": "La edad parece demasiado alta. Por favor verifica."
                    }, status=400)
                
                if peso_float > 500:
                    return JsonResponse({
                        "status": "error", 
                        "message": "El peso parece demasiado alto. Por favor verifica."
                    }, status=400)
                    
            except (ValueError, TypeError):
                return JsonResponse({
                    "status": "error", 
                    "message": "Edad o peso no válidos. Deben ser números."
                }, status=400)

            # Crear cliente
            cliente = Cliente.objects.create(
                nombre=nombre,
                apellido=apellido,
                direccion=direccion,
                email=email,
                telefono=telefono
            )

            # Crear mascota
            Mascota.objects.create(
                nombre=nombreMascota,
                especie=especie,
                raza=raza,
                edad=edad_int,
                peso=peso_float,
                cliente_id=cliente
            )

            # 3. Respuesta JSON
            return JsonResponse({"status": "ok", "message": "Registro creado correctamente"})
        
        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Error al registrar: {str(e)}"}, status=500)

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
            
            # Obtener datos de mascota
            edad = request.POST.get("edad")
            peso = request.POST.get("peso")
            
            # ✅ VALIDACIÓN: Verificar que edad y peso no sean negativos
            try:
                edad_int = int(edad)
                peso_float = float(peso)
                
                if edad_int < 0:
                    return JsonResponse({
                        "status": "error", 
                        "message": "La edad no puede ser negativa"
                    }, status=400)
                
                if peso_float < 0:
                    return JsonResponse({
                        "status": "error", 
                        "message": "El peso no puede ser negativo"
                    }, status=400)
                
                # Validación adicional: valores razonables
                if edad_int > 50:
                    return JsonResponse({
                        "status": "error", 
                        "message": "La edad parece demasiado alta. Por favor verifica."
                    }, status=400)
                
                if peso_float > 500:
                    return JsonResponse({
                        "status": "error", 
                        "message": "El peso parece demasiado alto. Por favor verifica."
                    }, status=400)
                    
            except (ValueError, TypeError):
                return JsonResponse({
                    "status": "error", 
                    "message": "Edad o peso no válidos. Deben ser números."
                }, status=400)
            
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
            mascota.edad = edad_int
            mascota.peso = peso_float
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
    
# ============================================
# 💉 SISTEMA DE VACUNACIÓN Y TRATAMIENTOS
# ============================================

from historial_de_vacunas.models import Historial_de_Vacunas
from tratamiento.models import Tratamiento

# API: Obtener todas las mascotas para el selector
def api_mascotas_selector(request):
    """Devuelve lista de mascotas con info del cliente para el selector"""
    mascotas = Mascota.objects.select_related("cliente_id").all()
    
    data = []
    for m in mascotas:
        data.append({
            "id": m.id_mascota,
            "nombre": m.nombre,
            "especie": m.especie,
            "raza": m.raza,
            "cliente": f"{m.cliente_id.nombre} {m.cliente_id.apellido}"
        })
    
    return JsonResponse({"mascotas": data})


# API: Obtener historial de vacunas de una mascota
def api_vacunas_mascota(request, mascota_id):
    """Devuelve el historial de vacunas de una mascota específica"""
    try:
        mascota = Mascota.objects.get(id_mascota=mascota_id)
        vacunas = Historial_de_Vacunas.objects.filter(mascota_id=mascota).order_by('-fecha_aplic')
        
        vacunas_data = []
        for v in vacunas:
            vacunas_data.append({
                "id": v.id_vacuna,
                "nombre": v.nombre_vacuna,
                "fecha_aplicacion": v.fecha_aplic.strftime("%Y-%m-%d"),
                "fecha_vencimiento": v.fecha_venc.strftime("%Y-%m-%d"),
                "lote": v.lote,
                "dias_para_vencer": (v.fecha_venc - date.today()).days
            })
        
        return JsonResponse({
            "status": "ok",
            "mascota": {
                "nombre": mascota.nombre,
                "especie": mascota.especie,
                "raza": mascota.raza
            },
            "vacunas": vacunas_data
        })
    
    except Mascota.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Mascota no encontrada"}, status=404)


# API: Obtener historial de tratamientos de una mascota
def api_tratamientos_mascota(request, mascota_id):
    """Devuelve el historial de tratamientos de una mascota a través de sus citas"""
    try:
        mascota = Mascota.objects.get(id_mascota=mascota_id)
        citas = Cita.objects.filter(mascota_id=mascota).prefetch_related('tratamiento_set')
        
        tratamientos_data = []
        for cita in citas:
            for t in cita.tratamiento_set.all():
                tratamientos_data.append({
                    "id": t.id_tratamiento,
                    "descripcion": t.descripcion,
                    "medicamento": t.medicamento,
                    "dosis": t.dosis,
                    "duracion": t.duracion,
                    "fecha_inicio": t.fecha_inicio.strftime("%Y-%m-%d"),
                    "cita_fecha": cita.fecha.strftime("%Y-%m-%d"),
                    "cita_motivo": cita.motivo
                })
        
        return JsonResponse({
            "status": "ok",
            "mascota": {
                "nombre": mascota.nombre,
                "especie": mascota.especie,
                "raza": mascota.raza
            },
            "tratamientos": tratamientos_data
        })
    
    except Mascota.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Mascota no encontrada"}, status=404)


# API: Registrar nueva vacuna
def registrar_vacuna(request):
    """Registra una nueva vacuna para una mascota"""
    if request.method == "POST":
        try:
            mascota_id = request.POST.get("mascota_id")
            nombre_vacuna = request.POST.get("nombre_vacuna")
            fecha_aplic = request.POST.get("fecha_aplicacion")
            fecha_venc = request.POST.get("fecha_vencimiento")
            lote = request.POST.get("lote")
            
            mascota = Mascota.objects.get(id_mascota=mascota_id)
            
            Historial_de_Vacunas.objects.create(
                nombre_vacuna=nombre_vacuna,
                fecha_aplic=fecha_aplic,
                fecha_venc=fecha_venc,
                lote=lote,
                mascota_id=mascota
            )
            
            return JsonResponse({"status": "ok", "message": "Vacuna registrada correctamente"})
        
        except Mascota.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Mascota no encontrada"}, status=404)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    
    return JsonResponse({"status": "error", "message": "Método no permitido"}, status=400)


# API: Registrar nuevo tratamiento
def registrar_tratamiento(request):
    """Registra un nuevo tratamiento asociado a una cita"""
    if request.method == "POST":
        try:
            cita_id = request.POST.get("cita_id")
            descripcion = request.POST.get("descripcion")
            medicamento = request.POST.get("medicamento")
            dosis = request.POST.get("dosis")
            duracion = request.POST.get("duracion")
            fecha_inicio = request.POST.get("fecha_inicio")
            
            cita = Cita.objects.get(id_cita=cita_id)
            
            Tratamiento.objects.create(
                descripcion=descripcion,
                medicamento=medicamento,
                dosis=dosis,
                duracion=duracion,
                fecha_inicio=fecha_inicio,
                cita_id=cita
            )
            
            return JsonResponse({"status": "ok", "message": "Tratamiento registrado correctamente"})
        
        except Cita.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Cita no encontrada"}, status=404)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    
    return JsonResponse({"status": "error", "message": "Método no permitido"}, status=400)

# ============================================
# 📊 SISTEMA DE REPORTES Y FACTURAS
# ============================================

from factura.models import Factura
from administrador.models import Administrador
from django.db.models import Sum, Count, Q
from decimal import Decimal

# API: Obtener resumen de facturas
def api_resumen_facturas(request):
    """Devuelve estadísticas generales de facturas"""
    
    total_facturas = Factura.objects.count()
    facturas_pagadas = Factura.objects.filter(estado_pago='Pagada').count()
    facturas_pendientes = Factura.objects.filter(estado_pago='Pendiente').count()
    
    # Calcular totales de dinero
    total_ingresos = Factura.objects.filter(estado_pago='Pagada').aggregate(
        total=Sum('monto_total')
    )['total'] or Decimal('0.00')
    
    total_pendiente = Factura.objects.filter(estado_pago='Pendiente').aggregate(
        total=Sum('monto_total')
    )['total'] or Decimal('0.00')
    
    return JsonResponse({
        "status": "ok",
        "resumen": {
            "total_facturas": total_facturas,
            "facturas_pagadas": facturas_pagadas,
            "facturas_pendientes": facturas_pendientes,
            "total_ingresos": float(total_ingresos),
            "total_pendiente": float(total_pendiente)
        }
    })


# API: Obtener todas las facturas
def api_listar_facturas(request):
    """Devuelve lista completa de facturas con info relacionada"""
    
    facturas = Factura.objects.select_related(
        'cliente_id', 'cita_id', 'administrador_id'
    ).all().order_by('-fecha_emision')
    
    data = []
    for f in facturas:
        data.append({
            "id": f.id_factura,
            "fecha": f.fecha_emision.strftime("%Y-%m-%d"),
            "cliente": f"{f.cliente_id.nombre} {f.cliente_id.apellido}",
            "monto": float(f.monto_total),
            "estado": f.estado_pago,
            "cita_motivo": f.cita_id.motivo,
            "administrador": f"{f.administrador_id.first_name}"
        })
    
    return JsonResponse({"status": "ok", "facturas": data})


# API: Obtener detalle de una factura
def api_detalle_factura(request, factura_id):
    """Devuelve información detallada de una factura específica"""
    try:
        factura = Factura.objects.select_related(
            'cliente_id', 'cita_id', 'administrador_id', 'cita_id__mascota_id'
        ).get(id_factura=factura_id)
        
        detalle = {
            "id": factura.id_factura,
            "fecha_emision": factura.fecha_emision.strftime("%Y-%m-%d"),
            "monto_total": float(factura.monto_total),
            "estado_pago": factura.estado_pago,
            
            # Info del cliente
            "cliente_nombre": f"{factura.cliente_id.nombre} {factura.cliente_id.apellido}",
            "cliente_email": factura.cliente_id.email,
            "cliente_telefono": factura.cliente_id.telefono,
            
            # Info de la cita
            "cita_fecha": factura.cita_id.fecha.strftime("%Y-%m-%d"),
            "cita_motivo": factura.cita_id.motivo,
            "mascota_nombre": factura.cita_id.mascota_id.nombre,
            
            # Info del administrador
            "administrador": f"{factura.administrador_id.first_name}"
        }
        
        return JsonResponse({"status": "ok", "detalle": detalle})
    
    except Factura.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Factura no encontrada"}, status=404)



def registrar_factura(request):
    """Crea una nueva factura"""
    if request.method == "POST":
        try:
            fecha_emision = request.POST.get("fecha_emision")
            monto_total = request.POST.get("monto_total")
            estado_pago = request.POST.get("estado_pago")
            cita_id = request.POST.get("cita_id")
            administrador_id = request.POST.get("administrador_id")
            cliente_id = request.POST.get("cliente_id")
            
            # ✅ VALIDACIÓN: Verificar que el monto sea válido y positivo
            try:
                monto_decimal = Decimal(monto_total)
                if monto_decimal < 0:
                    return JsonResponse({
                        "status": "error", 
                        "message": "El monto no puede ser negativo"
                    }, status=400)
            except (ValueError, TypeError, InvalidOperation):
                return JsonResponse({
                    "status": "error", 
                    "message": "El monto ingresado no es válido"
                }, status=400)
            
            # Obtener objetos relacionados
            cita = Cita.objects.get(id_cita=cita_id)
            User = get_user_model()
            administrador = User.objects.get(pk=administrador_id)
            cliente = Cliente.objects.get(id_cliente=cliente_id)
            
            # Crear factura
            Factura.objects.create(
                fecha_emision=fecha_emision,
                monto_total=monto_decimal,  # Usar el Decimal validado
                estado_pago=estado_pago,
                cita_id=cita,
                administrador_id=administrador,
                cliente_id=cliente
            )
            
            return JsonResponse({"status": "ok", "message": "Factura registrada correctamente"})
        
        except (Cita.DoesNotExist, User.DoesNotExist, Cliente.DoesNotExist):
            return JsonResponse({"status": "error", "message": "Datos relacionados no encontrados"}, status=404)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    
    return JsonResponse({"status": "error", "message": "Método no permitido"}, status=400)


# API: Actualizar estado de pago de factura
def actualizar_estado_factura(request):
    """Actualiza el estado de pago de una factura"""
    if request.method == "POST":
        try:
            factura_id = request.POST.get("factura_id")
            nuevo_estado = request.POST.get("estado_pago")
            
            factura = Factura.objects.get(id_factura=factura_id)
            factura.estado_pago = nuevo_estado
            factura.save()
            
            return JsonResponse({"status": "ok", "message": "Estado actualizado correctamente"})
        
        except Factura.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Factura no encontrada"}, status=404)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    
    return JsonResponse({"status": "error", "message": "Método no permitido"}, status=400)


# API: Cargar datos para formulario de factura (citas y clientes)
def api_datos_factura(request):
    """Devuelve citas y administradores disponibles para crear facturas"""
    User = get_user_model()

    # Citas (puedes añadir un filtro para "sin factura" si tienes ese campo)
    citas = Cita.objects.select_related('mascota_id', 'mascota_id__cliente_id').all()
    citas_data = []
    for c in citas:
        citas_data.append({
            "id": c.id_cita,
            "fecha": c.fecha.strftime("%Y-%m-%d"),
            "motivo": c.motivo,
            "cliente_id": c.mascota_id.cliente_id.id_cliente,
            "cliente_nombre": f"{c.mascota_id.cliente_id.nombre} {c.mascota_id.cliente_id.apellido}",
            "mascota": c.mascota_id.nombre
        })

    # Administradores -> ahora tomados desde el modelo User de Django
    admins_qs = User.objects.filter(is_staff=True, is_active=True).order_by('first_name', 'last_name')
    admins_data = []
    for u in admins_qs:
        full_name = f"{u.first_name} {u.last_name}".strip()
        if not full_name:
            full_name = getattr(u, 'username', str(u.pk))  # fallback
        admins_data.append({
            "id": u.pk,
            "nombre": full_name
        })

    return JsonResponse({
        "status": "ok",
        "citas": citas_data,
        "administradores": admins_data
    })




@require_http_methods(["GET"])
def citas_mascota(request, mascota_id):
    try:
        # Obtener la mascota primero
        mascota = Mascota.objects.get(id_mascota=mascota_id)
        
        # Obtener todas las citas de la mascota (CORREGIDO: usar mascota_id en lugar de id_mascota)
        citas = Cita.objects.filter(
            mascota_id=mascota  # Usamos el objeto mascota directamente
        ).select_related('veterinario_id').order_by('-fecha')
        
        citas_data = []
        for cita in citas:
            # Obtener el nombre completo del veterinario
            veterinario_nombre = f"{cita.veterinario_id.id_veterinario.nombre} {cita.veterinario_id.id_veterinario.apellido}"
            
            citas_data.append({
                'id': cita.id_cita,
                'fecha': cita.fecha.strftime('%Y-%m-%d'),
                'hora': cita.hora.strftime('%H:%M') if cita.hora else '',
                'motivo': cita.motivo,
                'veterinario': veterinario_nombre,
                'estado': cita.estado
            })
        
        return JsonResponse({
            'status': 'ok',
            'citas': citas_data
        })
        
    except Mascota.DoesNotExist:
        return JsonResponse({
            'status': 'error',
            'message': 'Mascota no encontrada'
        }, status=404)
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=400)