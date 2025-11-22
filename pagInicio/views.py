from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from cita.models import Cita
from cliente.models import Cliente
from mascota.models import Mascota
from datetime import date
from django.http import JsonResponse

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