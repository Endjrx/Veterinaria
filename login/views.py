from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login

# Create your views here.
def home (request):
    return render (request, 'login/vet_login.html')

def login_view (request):
    if request.method == "POST":

        username = request.POST.get('username')
        password = request.POST.get('password')

        # Verificar si el usuario existe
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)  # inicia sesión
            return redirect('homeini')  # cámbialo al nombre de tu página principal
        else:
            messages.error(request, "Usuario o contraseña incorrectos")

    return render(request, 'login/vet_login.html') 