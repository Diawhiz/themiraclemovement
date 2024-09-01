from django.contrib import admin

# Register your models here.
from .models import Contact, FirstTimer, Country

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'body', 'created_on')
    list_filter = ['created_on']
    search_fields = ('name', 'email', 'body')

@admin.register(FirstTimer)
class FirstTimerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone')
    list_filter = ['created_on']
    search_fields = ('name', 'email', 'phone')

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']