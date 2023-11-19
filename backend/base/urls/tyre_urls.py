from django.urls import path
from base.views import tyre_views as views


urlpatterns = [
    path('',views.gettyre,name='all-tyres'),


]
