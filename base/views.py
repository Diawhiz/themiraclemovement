from django.shortcuts import render, redirect
from .forms import ContactForm, FirstTimerForm

# Create your views here.
def home(request):
    contact_form = ContactForm()
    if request.method == 'POST':
        contact_form = ContactForm(request.POST)
        if contact_form.is_valid():
            contact_form.save()
    return render(request, 'base/home.html', {'contact_form': contact_form})

def about(request):
    return render(request, 'base/about.html')