from django import forms
from .models import Contacts, FirstTimer

class ContactsForm(forms.ModelForm):
    class Meta:
        model = Contacts
        fields = ('name', 'email', 'body')


class FirstTimerForm(forms.ModelForm):
    class Meta:
        model = FirstTimer
        fields = ('name', 'email', 'phone', 'body')
