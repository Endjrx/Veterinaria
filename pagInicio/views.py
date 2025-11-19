from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from cita.models import Cita
from cliente.models import Cliente

@login_required(login_url='home-login')
def home(request):
    cita = Cita.objects.filter(Estado="Programada").count() 
    pacientes = Cliente.objects.count()
    return render(request, 'pagInicio/vet_dashboard.html', {
        'total_citas': cita,
        'total_clientes_activos': pacientes
    })
