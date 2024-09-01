from django.shortcuts import render
from .forms import ContactForm, FirstTimerForm

# Create your views here.
def home(request):
    contact_form = ContactForm()
    return render(request, 'base/home.html', {'contact_form': contact_form})