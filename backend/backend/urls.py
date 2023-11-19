"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include,re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from . import views
from django.shortcuts import render
from django.http import HttpResponseRedirect
from base.views import product_views as views
from django.views.generic import TemplateView

urls = [
    path('tyreproducts/', include('base.urls.tyreproduct_urls')),
    path('tyres/', include('base.urls.tyre_urls')),
    path('users/', include('base.urls.user_urls')),
    path('orders/', include('base.urls.order_urls')),
    path('vehicles/', include('base.urls.vehicle_urls')),
    path('air/', include('base.urls.air_urls')),
    path('servicecenters/', include('base.urls.servicecenter_urls')),
    path('posts/', include('posts.urls')),
    path('<str:pk>/',views.getTyreProductbyId,name='typeproduct-Id'),



]



urlpatterns = [

    path('admin/', admin.site.urls),
    path('api/v1/supplier/',  include(urls)),
    path('api/v1/', include(urls)),
    path('product/', include('base.urls.tyreproduct_urls')),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
