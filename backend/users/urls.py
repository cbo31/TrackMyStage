from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('applications/', views.get_applications, name='applications'),
    path('new_application/', views.new_application, name='new_application'),
    path('me/', views.me, name='me'),
]