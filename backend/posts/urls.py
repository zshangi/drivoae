from django.urls import path
from .views import PostViewSet 
from rest_framework import routers
from base.views import product_views as views


products_router=routers.DefaultRouter()
products_router.register('',PostViewSet)
urlpatterns=products_router.urls