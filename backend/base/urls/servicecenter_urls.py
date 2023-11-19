from django.urls import path
from base.views import servicecenter_views as views

urlpatterns = [

    path('', views.getservicecenter, name='getservicecenter'),
    path('my/',views.getMyTimetables,name='user-timetable'),
]
