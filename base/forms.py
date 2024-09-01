from django import forms
from .models import Contact, FirstTimer, Country

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ('name', 'email', 'body')

class FirstTimerForm(forms.ModelForm):
    country = forms.ModelChoiceField(queryset=Country.objects.all())
    class Meta:
        model = FirstTimer
        fields = ('name', 'email', 'country', 'phone')