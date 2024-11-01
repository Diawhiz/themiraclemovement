from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('pastors/', views.pastors, name='pastors'),
    path('live/', views.LiveView, name='live'),
    path('blog/', views.BlogView.as_view(), name='blog'),
    path('blog/<slug:slug>/', views.BlogDetailView.as_view(), name='blog_detail'),
    path('blog/<slug:slug>/comment/', views.add_comment, name='add_comment'),
    path('dashboard/', views.TemplateView.as_view(), name='dashboard'),
]