from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyCreatorTokenView.as_view(), name='token-obtain-pair'),
    path('profile/', views.getUserProfile, name='users-profile'),
    path('profile/update/', views.updateUserProfile, name='user-profile-update'),
    path('', views.getUsers, name='users'),
    path('register/', views.registerUser, name='register'),
    path('addresses/<str:pk>/', views.getAddressItem, name='addresses'),
    path('addaddress/', views.addAddressItem, name='add-addresses'),
    path('vehicleuser/add/', views.SaveVehicleUser, name='savevehicleuser'),
    path('vehicleuser/update/<str:pk>/', views.updateVehicleusermain, name='updatevehicleusermain'),
    path('vehicleuser/del/<str:pk>/', views.delVehicleuser, name='delvehicleuser'),
    path('vehicleuser/<str:pk>/', views.getVehicleUser, name='vehicleuser'),
     path('addressuser/del/<str:pk>/', views.delAddressuser, name='deladdressuser'),

    path('verify/<str:token>/', views.verifyEmail, name='verify-email'),
    path('token/refresh/', views.MyTokenRefreshView.as_view(), name='token_refresh'),
]
