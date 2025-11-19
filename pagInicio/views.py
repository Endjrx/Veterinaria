from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from cita.models import Cita
from cliente.models import Cliente
from datetime import date

@login_required(login_url='home-login')
def home(request):

    cita = Cita.objects.filter(Fecha=date.today(), Estado="Programada")
    pacientes = Cliente.objects.count()
    contador_citas = Cita.objects.count()

    return render(request, 'pagInicio/vet_dashboard.html', {
        'total_citas_hoy': cita.count(),
        'total_clientes_activos': pacientes,
        'total_citas': contador_citas,
        'citas': cita
    })
