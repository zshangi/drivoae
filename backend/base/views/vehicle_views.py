from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Make,Model,Modification,VehicleTyre,Product
from base.serializers import MakeSerializer,ModelSerializer,ModificationSerializer,VehicleTyreSerializer,ProductSerializer
from rest_framework import viewsets
from rest_framework.generics import ListAPIView


@api_view(['GET'])
def getMake(request):
    make = Make.objects.all()
    serializer = MakeSerializer(make,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getModel(self):
    models = Model.objects.all()
    serializer = ModelSerializer(models,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getModification(request):
    trim = Modification.objects.all()
    serializer = ModificationSerializer(trim,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getVehicleTyre(request,pk):
    trim = VehicleTyre.objects.filter(modification_id=pk)
    serializer = VehicleTyreSerializer(trim,many=True)
    return Response(serializer.data)            

@api_view(['GET'])
def getVehicleProduct(request,pk):
    trim = Product.objects.filter(tyre_id=pk)
    serializer = ProductSerializer(trim,many=True)
    return Response(serializer.data)        