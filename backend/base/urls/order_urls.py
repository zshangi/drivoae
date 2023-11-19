from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('add/',views.addOrderItems,name='orders-add'),
    path('my/',views.getMyOrders,name='user-orders'),
    path('webhook/', views.handlewebhook, name='handle_webhook'),
    path('webhookathurise/', views.handlewebhookathurise, name='handle_handlewebhookathurise'),
    path('',views.getOrders,name='all-orders'),
    path('<str:pk>/',views.getOrderById,name='user-order'),
    path('<str:pk>/pay/',views.payOrder,name='pay-order'),
    path('custom_template/<int:pk>/', views.custom_template_view, name='custom_template_view'),
    path('job_order/<int:pk>/', views.job_order_view, name='job_order_view'),
    path('details_order/<int:pk>/', views.details_order_view, name='details_order_view'),
    path('paytamara/byid/', views.payTamarabyId, name='pay_tamara_by_id'),

]
