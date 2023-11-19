from django.conf import settings
from django.http import HttpResponseRedirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.serializers import UserSerializer, UserSerializerWithToken,AddressItemSerializer,VehicleUserlSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from rest_framework import status
import jwt
from base.models import AddressItem,ShippingAddress
from base.models import VehicleUser,Modification,Model,Make
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def emailSender(data):
    try:
        email = EmailMessage(
            subject=data['subject'],
            body=data['body'],
            from_email='zshangi@gmail.com',
            to=[data['to'], ]
        )

        email.send()
        return True
    except:
        return False
    
class MyTokenRefreshView(TokenRefreshView):
    throttle_scope = 'refresh_token'


class MyCreatorTokenSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v 

        return data


class MyCreatorTokenView(TokenObtainPairView):
    serializer_class = MyCreatorTokenSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getAddressItem(request,pk):
    user = request.user
    addresses=AddressItem.objects.filter(user_id=pk,flag=1)
    serializer = AddressItemSerializer(addresses, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addAddressItem(request):
    user = request.user
    data = request.data
        
    addressitem = AddressItem.objects.create(
        user = user,
        address =  data['address']['address'],
        lat =  data['address']['lat'],
        long =  data['address']['long'],
        details =  data['address']['details'],
        title = data['address']['title'],
        )
    serializer = AddressItemSerializer(addressitem, many=False)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    data = request.data

    user.first_name = data['name']
    user.username=user.username
    user.email = data['email']
    user.last_name= data['lastname']
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    serializer = UserSerializerWithToken(user, many=False)
    
    subject, from_email, to = 'Welcome to Drivo.ae', 'info@drivo.ae',  data['email']

    html_content = render_to_string('E1.html', {'varname':data['email']}) # render with dynamic value
    text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
    
    # create the email, and attach the HTML version as well.
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
        

    
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    username = data['pno']
    password = data['password']

    try:
        user = User.objects.create(
            username=data['pno'],
            first_name='',
            last_name='',
            email='',
            password=make_password(data['password']),
            is_active=True,
        )




    except:
        user = User.objects.get(username=username)
        user.password = make_password(password)
        user.save()
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)




@api_view(['GET'])
def verifyEmail(request, token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, ['HS256'])
        user = User.objects.get(id=payload['user_id'])
        user.is_active = True
        user.save()
        return HttpResponseRedirect('http://localhost:3000/login?tokne=success')
    except:
        return HttpResponseRedirect('http://localhost:3000/login?token=fail')


@api_view(['POST'])
def SaveVehicleUser(request):
    data = request.data
    user = request.user
    print(data['model'])
    print(data['year'])
    print(data['make'])
    makedata=Make.objects.get(make=data['make'])
    print(makedata._id)
    modeldata=Model.objects.get(model=data['model'],year=data['year'],make_id=makedata._id)
    print(modeldata._id)
    trimdata=Modification.objects.filter(trim=data['trim'],model_id=modeldata._id).first()
    vehicleuser = VehicleUser.objects.create(
        user=user,
        trim_id=trimdata._id,
        main=0,
        flag=1
        
    )

    serializer = VehicleUserlSerializer(vehicleuser, many=False)
    return Response(serializer.data)  

@api_view(['GET'])
def getVehicleUser(request,pk):
    
        vehicleuser = VehicleUser.objects.filter(user=pk,flag=1)
        serializer = VehicleUserlSerializer(vehicleuser, many=True)
        return Response(serializer.data)  
        
@api_view(['GET'])
def getVehicleUserByMain(request,pk):
    
        vehicleuser = VehicleUser.objects.filter(user=pk,main=1,flag=1)
        serializer = VehicleUserlSerializer(vehicleuser, many=False)
        return Response(serializer.data)  
                


@api_view(['PUT'])
def updateVehicleusermain(request,pk):
    vehicleusermain = VehicleUser.objects.get(_id=pk)
    vehicleusermain = VehicleUser.objects.filter(user=vehicleusermain.user).update(main=0)
    vehicleusermain = VehicleUser.objects.filter(_id=pk).update(main=1)


    vehicleuser=VehicleUser.objects.all()

    serializer = VehicleUserlSerializer(vehicleuser, many=False)
    return Response(serializer.data)
    
@api_view(['PUT'])
def delVehicleuser(request,pk):
    vehicleusermain = VehicleUser.objects.get(_id=pk)
    vehicleusermain = VehicleUser.objects.filter(_id=pk).update(flag=0)


    vehicleuser=VehicleUser.objects.filter(flag=1)

    serializer = VehicleUserlSerializer(vehicleuser, many=False)
    return Response(serializer.data)    

@api_view(['PUT'])
def delAddressuser(request,pk):
    addressuser = AddressItem.objects.filter(_id=pk).update(flag=0)

    serializer = AddressItemSerializer(addressuser, many=False)
    return Response(serializer.data)    
        