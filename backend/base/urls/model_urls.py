from django.urls import path
from base.views import vehicle_views as views
from rest_framework import routers
from base.views.vehicle_views import ModelViewSet 

products_router=routers.DefaultRouter()
products_router.register('',ModelViewSet)
urlpatterns=products_router.urls







