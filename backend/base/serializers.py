from django.db.models import fields
from django.contrib.auth.models import User,Group

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
import datetime
from base.models import Modification,Model,Make,VehicleUser,Product,Order,OrderItem,ShippingAddress,ServiceCenter,Timetable,Tyre,AddressItem,VehicleTyre,Brand,Brandorigin,Origin,TyreProduct,LabelCode,BrandPattern,PayTamara,PayStripe

# ////////////////////////////////////////////////////////////////////////////////
class OriginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Origin
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class BrandoriginSerializer(serializers.ModelSerializer):
    brand=serializers.SerializerMethodField(read_only=True)
    origin=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Brandorigin
        fields = '__all__' 
        
    def get_brand(self,obj):
        brand = BrandSerializer(obj.brand).data
        return brand  
    def get_origin(self,obj):
        origin = OriginSerializer(obj.origin).data
        return origin 

class BrandpatternSerializer(serializers.ModelSerializer):
    brand=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = BrandPattern
        fields = '__all__' 
        
    def get_brand(self,obj):
        brand = BrandSerializer(obj.brand).data
        return brand  

        
# ////////////////////////////////////////////////////////////////////////////////
        
class MakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = '__all__'

class ModelSerializer(serializers.ModelSerializer):
    make=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Model
        fields = '__all__'
    def get_make(self,obj):
        make = MakeSerializer(obj.make).data
        return make  

class ModificationSerializer(serializers.ModelSerializer):
    model=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Modification
        fields = '__all__'

    def get_model(self,obj):
        model = ModelSerializer(obj.model).data
        return model    
# ////////////////////////////////////////////////////////////////////////////////

class VehicleUserlSerializer(serializers.ModelSerializer):
    trim=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = VehicleUser
        fields = '__all__'

    def get_trim(self,obj):
            trim = ModificationSerializer(obj.trim).data
            return trim

        

class AddressItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressItem
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    lastName = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    addressItems = serializers.SerializerMethodField(read_only=True)
    groups = serializers.SlugRelatedField(
    many=True,
    read_only=True,
    slug_field='name',
     ) 

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name','lastName', 'isAdmin','groups','addressItems']

    def get_name(self, obj):
        name = obj.first_name
        return name

    def get_lastName(self, obj):
        lastName = obj.last_name
        return lastName

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_addressItems(self,obj):
        items = obj.addressitem_set.all()
        return AddressItemSerializer(items,many=True).data


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    addressItems = serializers.SerializerMethodField(read_only=True)
    groups = serializers.SlugRelatedField(
    many=True,
    read_only=True,
    slug_field='name',
    ) 

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name','lastName', 'isAdmin', 'token','groups','addressItems']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def get_addressItems(self,obj):
        items = obj.addressitem_set.all()
        return AddressItemSerializer(items,many=True).data


class TyreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tyre
        fields = '__all__'


class VehicleTyreSerializer(serializers.ModelSerializer):
    tyre=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = VehicleTyre
        fields = '__all__'

    def get_tyre(self,obj):
        tyre = TyreSerializer(obj.tyre).data
        return tyre 
 
class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = '__all__'

class LabelCodeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = LabelCode
        fields = '__all__'        
        

class TyreProductSerializer(serializers.ModelSerializer):
    tyre=serializers.SerializerMethodField(read_only=True)
    brandorigin=serializers.SerializerMethodField(read_only=True)
    brandpattern=serializers.SerializerMethodField(read_only=True)
    labelcode=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = TyreProduct
        fields = '__all__'

    def get_tyre(self,obj):
        tyre = TyreSerializer(obj.tyre).data
        return tyre    
    
    def get_brandorigin(self,obj):
        brandorigin = BrandoriginSerializer(obj.brandorigin).data
        return brandorigin 
    
    def get_brandpattern(self,obj):
        brandpattern = BrandpatternSerializer(obj.brandpattern).data
        return brandpattern     
        
    def get_labelcode(self,obj):
        labelcode = LabelCodeSerializer(obj.labelcode).data
        return labelcode  
        
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'



class PayTamaraSerializer(serializers.ModelSerializer):

    class Meta:
        model = PayTamara
        fields = '__all__'
 
        
class PayStripeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayStripe
        fields = '__all__'
        
        
class TimeTableSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Timetable
        fields = '__all__'


class ServicecentersSerializer(serializers.ModelSerializer):
    servicecenterItems = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ServiceCenter
        fields = '__all__'

    def get_servicecenterItems(self,obj):
        start_date=datetime.datetime.today().date()+datetime.timedelta(days=1)
        end_date=datetime.datetime.today().date()+datetime.timedelta(days=8)
        items = obj.timetable_set.filter(datetable__range=(start_date, end_date))
        return TimeTableSerializer(items,many=True).data


        
    def get_user(self,obj):
        return UserSerializer(obj.user,many=False).data        

class OrderItemSerializer(serializers.ModelSerializer):
    tyreproduct=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'
        
    def get_tyreproduct(self,obj):
        tyreproduct = TyreProductSerializer(obj.tyreproduct).data
        return tyreproduct     

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    PayTamara = serializers.SerializerMethodField(read_only=True)
    PayStripe = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    servicecenter=serializers.SerializerMethodField(read_only=True)
    timetable = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        

    def get_timetable(self,obj):
        timetable = TimeTableSerializer(obj.timetable).data
        return timetable     
    
    def get_orderItems(self,obj):
        items = obj.orderitem_set.all()
        return OrderItemSerializer(items,many=True).data

    def get_shippingAddress(self,obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress).data
        except:
            address = False
        return address
    
    def get_user(self,obj):
        return UserSerializer(obj.user,many=False).data

    def get_servicecenter(self,obj):
        return ServicecentersSerializer(obj.servicecenter,many=False).data
        
    def get_PayTamara(self,obj):
        try:
            paytamara = PayTamaraSerializer(obj.paytamara).data
        except:
            paytamara = False
        return paytamara

    def get_PayStripe(self,obj):
        try:
            paystripe = PayStripeSerializer(obj.paystripe).data
        except:
            paystripe = False
        return paystripe
       
       