



from django.db import models
from django.contrib.auth.models import User
import random
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
import requests
import json
from decimal import Decimal
import re

class DecimalEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, Decimal):
      return str(obj)
    return json.JSONEncoder.default(self, obj)

class Tyre(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True)
    width = models.CharField(max_length=200, null=True, blank=True)
    profile = models.CharField(max_length=200, null=True, blank=True)
    construction = models.CharField(max_length=200, null=True, blank=True)
    diameter= models.CharField(max_length=200, null=True, blank=True)
    flag=models.IntegerField(null=True, blank=True, default=0)
    url=models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Make(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    slug = models.CharField(max_length=200, null=True)
    make = models.CharField(max_length=200, null=True)
    logo = models.ImageField(max_length=300,null=True, blank=True)
    def __str__(self):
        return self.make


class Model(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    model = models.CharField(max_length=200, null=True)
    model_slug = models.CharField(max_length=200, null=True)
    make= models.ForeignKey(Make, on_delete=models.SET_NULL, null=True)
    year= models.CharField(max_length=200, null=True)
    def __str__(self):

        return  str(self.model)+ " (" + str(self.make.make)+")"
    
class Modification(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    model= models.ForeignKey(Model, on_delete=models.SET_NULL, null=True)
    trim = models.CharField(max_length=200, null=True)
    trim_slug= models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.trim   




class VehicleTyre(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    modification= models.ForeignKey(Modification, on_delete=models.SET_NULL, null=True)
    tyre= models.ForeignKey(Tyre, on_delete=models.SET_NULL, null=True)
    trim =models.CharField(max_length=200, null=True, blank=True)
    model= models.ForeignKey(Model, on_delete=models.SET_NULL, null=True)
    wheels=models.CharField(max_length=2, choices=(('1','frontonly'), ('2','reeronly'), ('3','both')), default = 1)
    tyreName=models.CharField(max_length=200, null=True, blank=True)
    def __str__(self):
        return self.tyreName 

class Origin(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=200, null=True)
    flag = models.ImageField(null=True, blank=True)


    def __str__(self):
        return str(self.title)   
    
class Brand(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=200, null=True)
    logo = models.ImageField(null=True, blank=True)


    def __str__(self):
        return str(self.title)   
        
class Brandorigin(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    brand = models.ForeignKey(Brand,on_delete=models.SET_NULL,null=True)
    origin = models.ForeignKey(Origin,on_delete=models.SET_NULL,null=True)


    def __str__(self):
        return  str(self.brand)+ " (" + str(self.origin)+")"

class BrandPattern(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    brand = models.ForeignKey(Brand,on_delete=models.SET_NULL,null=True)
    pattern = models.CharField(max_length=200, null=True)


    def __str__(self):
        return  str(self.brand)+ " (" + str(self.pattern)+")"        
        
        
class LabelCode(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    label = models.CharField(max_length=200, null=True)
    hexCode =  models.CharField(max_length=200, null=True)

    def __str__(self):
        return  str(self.label)
        
 
        

class TyreProduct(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name= models.CharField(max_length=200, null=True)
    brandorigin = models.ForeignKey(Brandorigin,on_delete=models.SET_NULL,null=True)
    tyre= models.ForeignKey(Tyre, on_delete=models.SET_NULL, null=True)
    ItCode= models.CharField(max_length=200, null=True)
    price = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    initialPrice = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)    
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    load_index= models.CharField(max_length=200, null=True, blank=True)
    speed_index= models.CharField(max_length=200, null=True, blank=True)
    brandpattern=  models.ForeignKey(BrandPattern,on_delete=models.SET_NULL,null=True)
    RFT= models.BooleanField(default=False)
    productionYear=models.IntegerField(null=True, blank=True, default=0)
    labelcode= models.ForeignKey(LabelCode, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(null=True, blank=True)
    description= models.CharField(max_length=2000, null=True, blank=True)
    imageurl = models.CharField(max_length=2000, null=True, blank=True)
    flag=models.IntegerField(null=True, blank=True, default=1)

    def __str__(self):
                return  str(self.name)+ " (" + str(self.tyre.name)+")"

class VehicleUser(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    trim = models.ForeignKey(Modification, on_delete=models.SET_NULL, null=True)
    name =models.CharField(max_length=200, null=True, blank=True)
    main=models.IntegerField(null=True, blank=True, default=0)
    flag=models.IntegerField(null=True, blank=True, default=1)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

    
class ServiceCenter(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,related_name="user")
    name = models.CharField(max_length=200, null=True)
    address=models.CharField(max_length=200, null=True)
    tel=models.CharField(max_length=200, null=True)
    latitude = models.CharField(max_length=200, null=True, blank=True)
    longitude = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    tyreServiceCenter=models.CharField(max_length=2, choices=(('1','Local'), ('2','Van'),('3','Ship')), default = 1)
    def __str__(self):
        return str(f"{self.name}")  

class Timetable(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    servicecenter = models.ForeignKey(ServiceCenter, on_delete=models.SET_NULL, null=True)
    datetable = models.DateField()
    part_AM = models.BooleanField(default=False)
    part_PM = models.BooleanField(default=False)
    isAvailable= models.CharField(max_length=2, choices=(('1','Available'), ('2','notAvailable')), default = 1)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return  str(self.servicecenter)+ " (" + str(self.datetable)+")"        

    
class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True)
    tyre=models.ForeignKey(Tyre, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    origin = models.CharField(max_length=200, null=True, blank=True)
    width = models.CharField(max_length=200, null=True, blank=True)
    profile = models.CharField(max_length=200, null=True, blank=True)
    construction = models.CharField(max_length=200, null=True, blank=True)
    diameter= models.CharField(max_length=200, null=True, blank=True)
    load_index= models.CharField(max_length=200, null=True, blank=True)
    speed_index= models.CharField(max_length=200, null=True, blank=True)
    pattern= models.CharField(max_length=200, null=True, blank=True)
    RFT= models.CharField(max_length=200, null=True, blank=True)
    production_year = models.CharField(max_length=200, null=True, blank=True)
    price_without_VAT  =models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    catname=models.CharField(max_length=200, null=True, blank=True)
    SPRICE1=models.CharField(max_length=200, null=True, blank=True)
    SPRICE2=models.CharField(max_length=200, null=True, blank=True)
    FITTPRICE=models.CharField(max_length=200, null=True, blank=True)
    OFFERPRICE=models.CharField(max_length=200, null=True, blank=True)
    OLDFITTPRICE=models.CharField(max_length=200, null=True, blank=True)
    procode=models.CharField(max_length=200, null=True, blank=True)
    show_flag = models.IntegerField(default = 0,null=True)
    delete_flag = models.IntegerField(default = 0,null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    service = models.CharField(max_length=20, choices=(('1','local service center'), ('2','van service'), ('3','ship an address')), default = 1)
    servicecenter = models.ForeignKey(ServiceCenter, on_delete=models.SET_NULL, null=True)
    timetable =  models.ForeignKey(Timetable, on_delete=models.SET_NULL, null=True)
    timeservice = models.CharField(max_length=200, null=True, blank=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    itemsPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    discount = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    totalCost= models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)    
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    DO=models.CharField(max_length=200, null=True, blank=True)
    invoice=models.CharField(max_length=200, null=True, blank=True)
    status = models.CharField(max_length=2, choices=(('1','Pending'), ('2','Paied'), ('3','Fulfilled'),('4','Transit to Installer'),('5','Installed/Shipped'),('6','Complete')), default = 1)

    def orderitem_set(self, obj):
        # Custom method to get a comma-separated list of order item names
        return ", ".join(item.name for item in obj.orderItems.all())

        
        
    def __str__(self):
        return str(self._id)



class OrderItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    tyreproduct = models.ForeignKey(TyreProduct, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)
    cost=models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)   
    grossProfit=models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True)  
    image = models.CharField(max_length=200, null=True, blank=True)
    
    @property
    def item_price(self):
        return self.qty * self.price
        
    def __str__(self):
        return str(self.tyreproduct.name)


class ShippingAddress(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    lat = models.CharField(max_length=200, null=True, blank=True)
    long = models.CharField(max_length=200, null=True, blank=True)
    details = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)

    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return str(self._id)


class PayTamara(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    order_id_tamara = models.CharField(max_length=200, null=True)
    checkout_id = models.CharField(max_length=200, null=True, blank=True)
    status=models.CharField(max_length=200, null=True, blank=True)
    isAuthorised=models.BooleanField(default=False)
    lastUpdate = models.DateTimeField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)
        
        
class Review(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)
        


class AddressItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    address=models.CharField(max_length=200, null=True, blank=True)
    lat = models.CharField(max_length=200, null=True, blank=True)
    long = models.CharField(max_length=200, null=True, blank=True)
    details = models.CharField(max_length=200, null=True, blank=True)
    flag=models.IntegerField(null=True, blank=True, default=1)

    def __str__(self):
        return str(self.title)  
     


    
class Post(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200, null=True)
    image = models.ImageField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name  
        
class PayStripe(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    customer_id = models.CharField(max_length=200, null=True)
    payment_intent_id = models.CharField(max_length=200, null=True, blank=True)
    amount = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.customer_id)


        

upper  = "ABCDEFGHJKLMNPQRSTVWXYZ"
digits = random.randint(1000,9999)
def id_generator(size=6, chars=upper + str(digits)+upper):
        return ''.join(random.choice(chars) for _ in range(size))

class Voucher(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=200, null=True)
    voucher = models.CharField(max_length=6, null=True, blank=True, unique=True)
    typeVoucher = models.CharField(max_length=20, choices=(('1','percent'), ('2','AED')), default = 1)
    amount =  models.IntegerField(null=True, blank=True, default=0)
    desc = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.title)




    def save(self):
        if not self.voucher:
            # Generate ID once, then check the db. If exists, keep trying.
            self.voucher = id_generator()
            while Voucher.objects.filter(voucher=self.voucher).exists():
                self.voucher = id_generator()
        super(Voucher, self).save()  
        
        
        
        
        
        
        
# ///////////////////////////////////////////////////////////////////
@receiver(post_save, sender=Order)
def captureorder(sender, instance, **kwargs):
    if instance.isDelivered==True and instance.paymentMethod=='tamara':
        order = instance._id
        orderr = Order.objects.get(_id=order)
        orderItems=OrderItem.objects.filter(order_id=orderr._id)
        print("test1")
        print(orderItems[0])
        totalprice=orderr.totalPrice
        totalprice=json.dumps(totalprice, cls=DecimalEncoder)
        totalprice = re.findall(r'\d+\.\d+', totalprice)
        totalprice=float(totalprice[0])
        deliveredAt=orderr.deliveredAt
        items=[]
        for  i in orderItems:
            price=json.dumps(i.price, cls=DecimalEncoder)
            price = re.findall(r'\d+\.\d+', price)
            price=float(price[0])
            print(price)
            comp={}
            comp['name'] = i.tyreproduct.name
            comp['type']="Tire"
            comp['reference_id']=i._id
            comp['sku']=i.tyreproduct.ItCode
            comp['quantity']=i.qty
            comp['total_amount']={'amount':price,'currency':'AED'}

            items.append(comp)
            
        print(items)    
        paytamara = PayTamara.objects.get(order_id=order)
        paytamara=paytamara.order_id_tamara


        payload = {
            "order_id": paytamara,
            "total_amount": {
                "amount": totalprice,
                "currency": "AED"
            },
            "items": items,
        
            "shipping_info": {
                "shipped_at": "2020-03-31T19:19:52.677Z",
                "shipping_company": "DHL"
            }
        }


        print(payload)

        headers= {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiIzNzI1YTJmMC0wZmQ1LTRlNGEtYmQ5Mi04OGEwMTkyNmRmNjIiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiNWEwNmU2YWU5ODUzYjZmOWQwNGIxZjM5ZTc2NGUxZjkiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5NDA5MjUwNiwiaXNzIjoiVGFtYXJhIFBQIn0.vh9C2U5ILW_h9m0kIjHNUdEvrd5gGuKaPmiskT8LrOQRc5EILCnwOxPHT4nePKysCYvoAr_9hM5kT9mkOZjEE2NgmgkLwahh1G3ZYIn6r_9LfeAPMDDvQjtikj4tVr8hqaMFhIaoAU0v4i2bH5S08_QqxqvW4xkwa5veAOYCDPO5_FJRvGycYvdBXP-YtmpW1q9hzTL3eLJFqMmBQiOzh-mCI5cN7dUTWF_L3_NL2PJ4NQCiOCuup1j-0tVo0ssQYLQjNZXQZ3NFVhi3DW8N-rPI8obEDpQP53ecURi6ex5QSSEhqTLYoMFBwD6jCaTy2EEn-gtN9l84xFRTkynOdg',
          'Content-type': 'application/json',
          'accept': 'application/json',


        }

        print(payload)
        
        response = requests.post('https://api.tamara.co/payments/capture', json=payload,headers=headers)
        if response.status_code==200:
            print('capture is done')
        else:
            print(response.__dict__)

post_save.connect(captureorder, sender=Order)  

