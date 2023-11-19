from django.urls import path
from base.views import air_views as views
urlpatterns = [
    path('save-stripe-info/', views.save_stripe_info),
    path('save-tamara-info/', views.save_tamara_info),
    path('update-tamara-info/', views.update_tamara_info),



]