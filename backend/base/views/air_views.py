from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.shortcuts import redirect
from django.conf import settings
from django.http import JsonResponse
from base.models import  Order,PayStripe,OrderItem,Timetable,PayTamara,TyreProduct
from base.utils.pay_utils import idpayUpdateDB, idpayVerify, idpayCompleteDB
import stripe
from django.http import HttpResponseRedirect
from rest_framework.views import APIView
from django.core.mail import send_mail
import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from base.serializers import PayTamaraSerializer
import json
import requests
stripe.api_key = settings.STRIPE_SECRET_KEY







@api_view(['POST'])
def save_stripe_info(request):
    if request.method == 'POST':
        data = request.data
        user = request.user
        email = data['email']
        amount = data['amount']
        amount=amount
        order=data['order']
        print("order:")
        print(order)
        payment_method_id = data['payment_method_id']
        try:
            extra_msg = ''
            # checking if customer with provided email already exists
            customer_data = stripe.Customer.list(email=email).data
            print(customer_data)
        
            if len(customer_data) == 0:
                # creating customer
                customer = stripe.Customer.create(
                    email=email,
                    payment_method=payment_method_id,
                    invoice_settings={
                        'default_payment_method': payment_method_id
                    }
                )
            else:
                customer = customer_data[0]
                extra_msg = "Customer already existed."
        
            # creating paymentIntent
        
            # Step 3: Create a PaymentIntent
            intent = stripe.PaymentIntent.create(
                amount=data['amount'],
                currency='AED',
                customer=customer.id,
                payment_method=data['payment_method_id'],
                off_session=True,
                confirm=True
            )
            # Step 4: Save the payment result to your model PayStripe
            payment_data = {
                'customer_id': customer.id,
                'payment_intent_id': intent.id,
                'amount': data['amount'],
                'user_id' :  data['user']['id'],
                'order_id' :  order,
        
                # Add any other relevant payment information you want to store
            }
            payment_stripe = PayStripe.objects.create(**payment_data)
            Order.objects.filter(_id=data['order']).update(isPaid=True,paidAt=datetime.datetime.now(),paymentMethod='stripe',status=2)


           #send Email    
            itemInfo=[]
            order=Order.objects.get(_id=order)
            orderItems=OrderItem.objects.filter(order_id=order)
            
            for i in orderItems:
                    tyreproduct=TyreProduct.objects.get(_id=i.tyreproduct_id)
                    item={}
                    item['tyreproduct']=tyreproduct.name
                    item['productionYear']=tyreproduct.productionYear
                    item['sku']=tyreproduct.ItCode
                    item['qty']=i.qty
                    item['price']=str(i.price)
                    itemInfo.append(item)
            dataJO={
                "agent": "agent",
                "orderid": order._id,
                "user": order.user.last_name,
                "servicecenter": order.servicecenter.name,
                "timeservice": order.timeservice,
                "dateservice": str(order.timetable.datetable),
                "orderDate":str(order.createdAt),
                "subtotal":str(order.itemsPrice),
                "installation":str(order.shippingPrice),
                "grand_total":str(order.totalPrice),
                "iteminfo": itemInfo
            }
            url = "https://api.zeptomail.com/v1.1/email/template"
            
            #For JO
            payload = {
                "mail_template_key": "2d6f.36bb76c6cfe3491f.k1.8cd554f0-770f-11ee-a979-525400e3c1b1.18b8023dfbf",
                "from": {"address": "noreply@drivo.ae", "name": "noreply"},
                "to": [{"email_address": {"address": "hooman@drivo.ae", "name": "homman Bakhtekian"}},{"email_address": {"address": "info@uaetyres.com", "name": "hooman Bakhtekian"}},{"email_address": {"address": "info@drivo.ae", "name": "drivo.ae"}}],
                "merge_info": dataJO
            }
            
            payload_str = json.dumps(payload, indent=4)
            headers = {
            'accept': "application/json",
            'content-type': "application/json",
            'authorization': "Zoho-enczapikey wSsVR611/Rf3Ca8pyDX7Iuo5nwlVBF6gQx54jVryuHGtG6jC/Mc9wkHLDQ6hH6MXQGJtFWAa979/kBsH1DFfi91+zAxUWSiF9mqRe1U4J3x17qnvhDzIX2tYlBuKJIoBzwVvk2ZiEssk+g==",
            }
            
            response = requests.request("POST", url, data=payload_str, headers=headers)
            print(response.text)
            
            #For E2
            payloadE = {
                "mail_template_key": "2d6f.36bb76c6cfe3491f.k1.90d19ff0-76fb-11ee-a979-525400e3c1b1.18b7fa0e76f",
                "from": {"address": "noreply@drivo.ae", "name": "noreply"},
                "to": [{"email_address": {"address": order.user.email, "name": order.user.last_name}},{"email_address": {"address": "hooman@drivo.ae", "name": "hooman Bakhtekian"}}],
                "merge_info": dataJO
            }
            
            payload_str_E = json.dumps(payloadE, indent=4)
            headers = {
            'accept': "application/json",
            'content-type': "application/json",
            'authorization': "Zoho-enczapikey wSsVR611/Rf3Ca8pyDX7Iuo5nwlVBF6gQx54jVryuHGtG6jC/Mc9wkHLDQ6hH6MXQGJtFWAa979/kBsH1DFfi91+zAxUWSiF9mqRe1U4J3x17qnvhDzIX2tYlBuKJIoBzwVvk2ZiEssk+g==",
            }
            
            response = requests.request("POST", url, data=payload_str_E, headers=headers)
            print(response.text) 
            #end send email 
                       
        
            return JsonResponse({'clientSecret': intent.client_secret})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

    
@api_view(['POST'])
def save_tamara_info(request):
    user = request.user
    data = request.data
        
    order = PayTamara.objects.create(
        user = user,
        order_id=data['order_id']['order_id'],
        order_id_tamara = data['order_id']['order_id_tamara'],
        checkout_id = data['order_id']['checkout_id'],
        status = data['order_id']['status'],
        )
    serializer = PayTamaraSerializer(order,many=False)
    return Response(serializer.data)
    
@api_view(['PUT'])
def update_tamara_info(request):
    user = request.user
    data = request.data
    if  data['status']=="authorised":
        updatepaytamara=PayTamara.objects.filter(order_id_tamara=data['order_id_tamara']).update(isAuthorised=True,lastUpdate=datetime.datetime.now())
        order=PayTamara.objects.filter(order_id_tamara=data['order_id_tamara']).first()
        Order.objects.filter(_id=order.order_id).update(isPaid=True,paidAt=datetime.datetime.now(),paymentMethod='tamara')

        orderinfo=Order.objects.get(_id=order.order_id)
        iteminfo=OrderItem.objects.filter(order_id=order.order_id)
        ordertimetable=orderinfo.timetable_id
        if orderinfo.servicecenter_id==13:
                updatetimetable = Timetable.objects.filter(_id=ordertimetable).update(isAvailable=2)

        
        
        
        # subject, from_email, to = 'Thanks to choose Drivo.ae', 'info@drivo.ae',  orderinfo.user.email
        # html_content = render_to_string('E2.html', {'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
        # # create the email, and attach the HTML version as well.
        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        # msg.attach_alternative(html_content, "text/html")
        # msg.send()
        
        # subject, from_email, to = 'Drivo.ae Job Order Email', 'info@drivo.ae',  orderinfo.servicecenter.user.email
        # html_content = render_to_string('E3.html', {'orderid':order,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'agent':orderinfo.servicecenter.user.last_name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
        # # create the email, and attach the HTML version as well.
        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        # msg.attach_alternative(html_content, "text/html")
        # msg.send()
        
        # subject, from_email, to = 'Drivo.ae Job Order Email', 'info@drivo.ae', 'info@uaetyres.com'
        # html_content = render_to_string('JO.html', {'orderid':order,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'agent':orderinfo.servicecenter.user.last_name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
        # # create the email, and attach the HTML version as well.
        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        # msg.attach_alternative(html_content, "text/html")
        # msg.send()
        
    
    serializer = PayTamaraSerializer(order,many=False)
    return Response(serializer.data)    
    

    
