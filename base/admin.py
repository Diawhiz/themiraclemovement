from django.contrib import admin

# Register your models here.
from .models import Contact, FirstTimer, Country, Post, Comment

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'body', 'created_on')
    list_filter = ['created_on']
    search_fields = ('name', 'email', 'body')

@admin.register(FirstTimer)
class FirstTimerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'country', 'phone')
    list_filter = ['created_on']
    search_fields = ('name', 'email', 'phone')

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']


class PostAdmin(admin.ModelAdmin):
    FroalaField = ('content',)
    list_display = ('title', 'slug', 'status', 'posted_on')
    list_filter = ['status']
    search_fields = ['title']
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(Post, PostAdmin)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'body', 'post', 'created_on', 'active')
    list_filter = ('active', 'created_on')
    search_fields = ('name', 'email', 'body')
    actions = ['approve_comments']

    def approve_comments(self, request, queryset):
        queryset.update(active=True)