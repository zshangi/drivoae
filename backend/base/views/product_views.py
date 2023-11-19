from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from base.models import Product,TyreProduct,Tyre
from base.serializers import ProductSerializer,TyreProductSerializer,TyreSerializer
import time
from django.db.models import Q
from django.http import HttpResponse

from django.http import HttpResponseRedirect

@api_view(['POST'])
def getTyreProductsByTyre(request):
    data=request.data
    print(data)
    print("sdsdfs")
    tyre=Tyre.objects.filter(width=data['data']['width'],profile=data['data']['profile'],diameter=data['data']['diameter']).first()
    product=TyreProduct.objects.filter(tyre_id=tyre._id,flag=1)
    serializer = TyreProductSerializer(product, many=True)
    return Response(serializer.data)

@api_view(http_method_names=['GET'])
def getTyreProducts(request):
    product = TyreProduct.objects.filter(flag=1)

    serializer = TyreProductSerializer(product, many=True)
    return Response(serializer.data)

@api_view(http_method_names=['GET'])
def getTyreProduct(request, pk):
    product = TyreProduct.objects.get(_id=pk).order_by('price').values()
    serializer = TyreProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(http_method_names=['GET'])
def getTyreProductByTyre(request, pk):
    product = TyreProduct.objects.filter(tyre_id=pk)
    serializer = TyreProductSerializer(product, many=True)
    return Response(serializer.data)        



@api_view(http_method_names=['GET'])
def getTyreProductbyId(request, pk):
    product = TyreProduct.objects.get(_id=pk)
    serializer = TyreProductSerializer(product, many=False)
    return Response(serializer.data)    


@api_view(http_method_names=['GET'])
def getTyres(request):
    tyre = Tyre.objects.all().order_by(width)
    serializer = TyreSerializer(tyre, many=True)
    return Response(serializer.data)    