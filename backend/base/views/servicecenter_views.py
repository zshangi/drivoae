from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import datetime
from base.models import ServiceCenter,Timetable
from base.serializers import TimeTableSerializer,ServicecentersSerializer



@api_view(['GET'])
def getservicecenter(request):
        order = ServiceCenter.objects.all()
        serializer = ServicecentersSerializer(order,many=True)
        return Response(serializer.data)

  
@api_view(['GET'])
def getMyTimetables(request):
    start_date=datetime.datetime.today().date()
    end_date=datetime.datetime.today().date()+datetime.timedelta(days=7)
    timetables = Timetable.objects.filter(datetable__range=(start_date, end_date))
    
    serializer = TimeTableSerializer(timetables,many=True)
    return Response(serializer.data)