from django.contrib import admin
from django.contrib.admin import AdminSite
from django.utils.translation import gettext_lazy as _

from .models import Contact, FirstTimer, Post, Comment, Event, PageVisit, EventAttendance

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

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'event_date')


#church admin reg
class ChurchAdminSite(AdminSite):
    site_header = _('Church Management Dashboard')
    site_title = _('Church Admin')
    index_title = _('Dashboard')

church_admin = ChurchAdminSite(name='church_admin')

@admin.register(PageVisit, site=church_admin)
class PageVisitAdmin(admin.ModelAdmin):
    list_display = ('page_url', 'timestamp', 'ip_address')
    list_filter = ('timestamp', 'page_url')
    search_fields = ('page_url', 'ip_address')

@admin.register(EventAttendance, site=church_admin)
class EventAttendanceAdmin(admin.ModelAdmin):
    list_display = ('event_name', 'date', 'attendees_count')
    list_filter = ('date', 'event_name')
    search_fields = ('event_name',)