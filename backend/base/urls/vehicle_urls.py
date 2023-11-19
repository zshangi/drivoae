from django.urls import path
from base.views import vehicle_views as views
from rest_framework import routers



urlpatterns = [
    
    path('make/',views.getMake,name='list-make'),
    path('model/',views.getModel,name='list-model'),
    path('trim/',views.getModification,name='list-trim'),
    path('vehicletyre/<str:pk>/',views.getVehicleTyre,name='list-trim'),
    path('vehicleproduct/<str:pk>/',views.getVehicleProduct,name='list-trim'),




]





