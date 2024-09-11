from django import forms
from .models import Contact, FirstTimer, Country, Comment

class ContactForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        placeholders = {
            'name': 'Fullname',
            'email': 'Email Address',
            'body': 'Send us message',
        }
        for field, placeholder in placeholders.items():
            self.fields[field].widget.attrs['placeholder'] = placeholder
            
    class Meta:
        model = Contact
        fields = ('name', 'email', 'body')

class FirstTimerForm(forms.ModelForm):
    country = forms.ModelChoiceField(queryset=Country.objects.all())
    class Meta:
        model = FirstTimer
        fields = ('name', 'email', 'country', 'phone')

# comment form
class CommentForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(CommentForm, self).__init__(*args, **kwargs)
        placeholders = {
            'name': 'Fullname',
            'email': 'Email Address',
            'body': 'Add your comment',
        }
        for field, placeholder in placeholders.items():
            self.fields[field].widget.attrs['placeholder'] = placeholder

    class Meta:
        model = Comment
        fields = ('name', 'email', 'body')