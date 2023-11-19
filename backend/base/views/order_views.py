from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from base.models import Product,Order,OrderItem,ShippingAddress, AddressItem,TyreProduct,Timetable,PayTamara
from base.serializers import OrderSerializer,PayTamaraSerializer
import stripe
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
import requests
from django.http import HttpResponse
from django.shortcuts import render
import decimal
import requests

def custom_template_view(request, pk):
    order = Order.objects.get(_id=pk)
    iteminfo=OrderItem.objects.filter(order_id=pk)
    return render(request, 'Email.html', {'obj': order,'iteminfo':iteminfo,'orderid':pk})

def job_order_view(request, pk):
    order = Order.objects.get(_id=pk)
    iteminfo=OrderItem.objects.filter(order_id=pk)
    return render(request, 'JO.html', {'order': order,'iteminfo':iteminfo,'orderid':pk})

def details_order_view(request, pk):
    order = Order.objects.get(_id=pk)
    iteminfo=OrderItem.objects.filter(order_id=pk)
    return render(request, 'Details_order.html', {'order': order,'iteminfo':iteminfo,'orderid':pk})


@api_view(['POST'])
def addOrderItems(request):
    global cost
    global taxcost
    global totalCost
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        # (1) Create order
        cost=0
        taxcost=0
        totalCost=0
        for i in orderItems:
            tyreproduct = TyreProduct.objects.get(_id=i['product'])
            
            cost+=tyreproduct.initialPrice*i['qty']
        taxcost=cost* decimal.Decimal(0.05)
        
        if data['serviceCenter']['serviceid']==2:
            totalCost=cost+ decimal.Decimal(50)+taxcost
            totalCost="{:.2f}".format(totalCost)
        else:
            totalCost=cost+taxcost
            totalCost="{:.2f}".format(totalCost)
        print(totalCost)    
        

        print(user.first_name)
        print( data['serviceCenter'])
        order = Order.objects.create(
            user = user,
            service = data['serviceCenter']['serviceid'],
            servicecenter_id = data['serviceCenter']['servicecenterid'],
            timetable_id = data['serviceCenter']['dateservice'],
            timeservice = data['serviceCenter']['timeservice'],
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            itemsPrice=data['itemsPrice'],
            shippingPrice = data['shippingPrice'],
            discount=data['discount'],
            totalPrice = data['totalPrice'],
            totalCost = totalCost,

        )


    

        # (2) Create shipping address
        
        shipping = ShippingAddress.objects.create(
            order = order,
            user = user,
            address = data['shippingAddress']['address'],
            lat = data['shippingAddress']['lat'],
            long = data['shippingAddress']['long'],
            details = data['shippingAddress']['details'],
        )

        
        # (3) Create order item and set order to orderItems relationship

        itemInfo = []    
        for i in orderItems:
            tyreproduct = TyreProduct.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
            	tyreproduct_id=tyreproduct._id,
                order = order,
                qty=i['qty'],
                price = i['price'],
            )
        # (4) Update stock
            tyreproduct.countInStock -= item.qty
            tyreproduct.save()
        


        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOrders(request):
    user=request.user
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    try:
        user = request.user
        order = Order.objects.get(_id=pk)
        
        if user.is_staff or order.user == user or  user.groups=="supplier":
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            return Response({'detail':'Not authorized to view this order !'},
                            status=status.HTTP_400_BAD_REQUEST)  
    except:
        return Response({'detail':'Order does not exist !'},
                        status=status.HTTP_404_NOT_FOUND)     
        
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def payOrder(request,pk):
    user = request.user
    
    try:
        order = Order.objects.get(_id=pk)
    except Order.DoesNotExist:
        return Response({'detail':'Order not found !'}, status=status.HTTP_404_NOT_FOUND)
    else:
        
        if order.isPaid:
            return Response({'detail':'Order has already been paid !'}, 
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                response = idpayCreatePay(user,order)
            except:
                return Response({'detail':'The idpay server connection was not established !'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                
                if(str(response.status_code).startswith('2')):
                    resJson = response.json()
                    if(idpayCreateDB(user, order, resJson['id'])):
                        return Response(resJson, status=status.HTTP_200_OK)
                    else:
                        return Response({'detail':'db error !'},
                                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                        
     


    
@csrf_exempt
def handlewebhook(request):
    if request.method == 'POST':
        payload = json.loads(request.body)
        print('Received webhook from tamara:', payload)
        orderidtamara=payload['order_id']
        try:
            status=payload['order_status']
            if status=='approved':
                orderid=payload['order_reference_id']
                now = datetime.now()
                updatepaytamara=PayTamara.objects.filter(order_id=orderid).update(status='approved',lastUpdate=now)
                response = requests.post('https://api.tamara.co/orders/' + orderidtamara + '/authorise', headers={'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiIzNzI1YTJmMC0wZmQ1LTRlNGEtYmQ5Mi04OGEwMTkyNmRmNjIiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiNWEwNmU2YWU5ODUzYjZmOWQwNGIxZjM5ZTc2NGUxZjkiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTY5NDA5MjUwNiwiaXNzIjoiVGFtYXJhIFBQIn0.vh9C2U5ILW_h9m0kIjHNUdEvrd5gGuKaPmiskT8LrOQRc5EILCnwOxPHT4nePKysCYvoAr_9hM5kT9mkOZjEE2NgmgkLwahh1G3ZYIn6r_9LfeAPMDDvQjtikj4tVr8hqaMFhIaoAU0v4i2bH5S08_QqxqvW4xkwa5veAOYCDPO5_FJRvGycYvdBXP-YtmpW1q9hzTL3eLJFqMmBQiOzh-mCI5cN7dUTWF_L3_NL2PJ4NQCiOCuup1j-0tVo0ssQYLQjNZXQZ3NFVhi3DW8N-rPI8obEDpQP53ecURi6ex5QSSEhqTLYoMFBwD6jCaTy2EEn-gtN9l84xFRTkynOdg'})
                try:
                    status=payload['event_type']
                    if status=='order_authorised':
                        print("Authorised")
                        updatepaytamara=PayTamara.objects.filter(order_id=orderid).update(status='Authorised',lastUpdate=now)
                        cost=Order.objects.get(_id=orderid)
                        gatewayfee=cost.totalCost*decimal.Decimal(0.05)
                        cost=cost.totalCost+gatewayfee
                        cost="{:.2f}".format(cost)
                        updateorder=Order.objects.filter(_id=orderid).update(isPaid=True,paidAt=now,paymentMethod='tamara',totalCost=cost,status=2)
                       
                       
                       #send Email    
                        itemInfo=[]
                        order=Order.objects.get(_id=orderid)
                        orderItems=OrderItem.objects.filter(order_id=orderid)
                        
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
                            "user": user.last_name,
                            "servicecenter": data['serviceCenter']['servicecenter'],
                            "timeservice": order.timeservice,
                            "dateservice": data['serviceCenter']['timetable'],
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
                            "to": [{"email_address": {"address": "drivo.ae@gmail.com", "name": "homman Bakhtekian"}},{"email_address": {"address": "info@uaetyres.com", "name": "homman Bakhtekian"}},{"email_address": {"address": "info@drivo.ae", "name": "drivo.ae"}}],
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
                            "to": [{"email_address": {"address": order.user.email, "name": order.user.last_name}},{"email_address": {"address": "homman@drivo.ae", "name": "homman Bakhtekian"}}],
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
                       
                       
                       
                
                        # print(order.order_id)
                        # orderid=order.order_id
                        # orderinfo=Order.objects.get(_id=orderid)
                        # print(orderinfo._id)
                        # iteminfo=OrderItem.objects.filter(order_id=orderid)

                        # subject, from_email, to = 'Thanks to choose Drivo.ae', 'info@drivo.ae', orderinfo.user.email
                        # html_content = render_to_string('E2.html', {'order':orderinfo,'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
                        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
                        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                        # msg.attach_alternative(html_content, "text/html")
                        # msg.send()
                        
                        
                        # subject, from_email, to = 'Thanks to choose Drivo.ae', 'info@drivo.ae', 'info@uaetyres.com'
                        # html_content = render_to_string('E2.html', {'order':orderinfo,'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
                        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
                        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                        # msg.attach_alternative(html_content, "text/html")
                        # msg.send()
                        
                        # subject, from_email, to = 'Thanks to choose Drivo.ae', 'info@drivo.ae', 'drivo.ae@gmail.com'
                        # html_content = render_to_string('E2.html', {'order':orderinfo,'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
                        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
                        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                        # msg.attach_alternative(html_content, "text/html")
                        # msg.send()
                        
                        # subject, from_email, to = 'Thanks to choose Drivo.ae', 'info@drivo.ae', 'zshangi@gmail.com'
                        # html_content = render_to_string('E2.html', {'order':orderinfo,'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
                        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
                        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                        # msg.attach_alternative(html_content, "text/html")
                        # msg.send()
                        
                        # subject, from_email, to = 'Thanks to choose Drivo.ae', 'info@drivo.ae', 'pa.vaghefi@gmail.com'
                        # html_content = render_to_string('E2.html', {'order':orderinfo,'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
                        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
                        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                        # msg.attach_alternative(html_content, "text/html")
                        # msg.send()
                    
                        # subject, from_email, to = 'Thanks to choose Drivo.ae', 'info@drivo.ae', 'drivo.ae@gmail.com'
                        # html_content = render_to_string('JO.html', {'order':orderinfo,'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'agent':orderinfo.servicecenter.user.last_name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.last_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
                        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
                        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                        # msg.attach_alternative(html_content, "text/html")
                        # msg.send()       
                        
                        # subject, from_email, to = 'Drivo.ae Job Order Email', 'info@drivo.ae', 'info@uaetyres.com'
                        # html_content = render_to_string('JO.html', {'order':orderinfo,'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'agent':orderinfo.servicecenter.user.last_name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.last_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
                        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
                        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                        # msg.attach_alternative(html_content, "text/html")
                        # msg.send()
                except:
                    pass
        except:
            pass
            
        return JsonResponse({'message': 'Webhook processed successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)    

@csrf_exempt
def handlewebhookathurise(request):
    if request.method == 'POST':
        payload = json.loads(request.body)
        now = datetime.now()
        orderid=payload['order_id']
        print(orderid)
        updatepaytamara=PayTamara.objects.filter(order_id_tamara=orderid).update(status='Authorised',lastUpdate=now)
        order=PayTamara.objects.filter(order_id_tamara=orderid).first()
        Order.objects.filter(_id=order.order_id).update(isPaid=True,paidAt=now,paymentMethod='tamara')
        
        
        
        orderinfo=Order.objects.get(_id=order.order_id)
        iteminfo=OrderItem.objects.filter(order_id=order.order_id)
        ordertimetable=orderinfo.timetable_id
        if orderinfo.servicecenter_id==13:
            updatetimetable = Timetable.objects.filter(_id=ordertimetable).update(isAvailable=2)




        # subject, from_email, to = 'Thanks to choose Drivo.ae', 'info@drivo.ae', orderinfo.user.email
        # html_content = render_to_string('E2.html', {'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        # msg.attach_alternative(html_content, "text/html")
        # msg.send()
        
        
        # subject, from_email, to = 'Thanks to choose Drivo.ae', 'info@drivo.ae', 'info@uaetyres.com'
        # html_content = render_to_string('E2.html', {'order':orderinfo,'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.first_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        # msg.attach_alternative(html_content, "text/html")
        # msg.send()
        
        # # subject, from_email, to = 'Drivo.ae Job Order Email', 'info@drivo.ae',  orderinfo.servicecenter.user.email
        # # html_content = render_to_string('E3.html', {'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'agent':orderinfo.servicecenter.user.last_name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.last_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
        # # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
        # # # create the email, and attach the HTML version as well.
        # # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        # # msg.attach_alternative(html_content, "text/html")
        # # msg.send()
        
        # subject, from_email, to = 'Drivo.ae Job Order Email', 'info@drivo.ae', 'info@uaetyres.com'
        # html_content = render_to_string('JO.html', {'orderid':orderinfo._id,'date':orderinfo.paidAt,'amount':orderinfo.totalPrice,'servicecenter':orderinfo.servicecenter.name,'agent':orderinfo.servicecenter.user.last_name,'dateservice':orderinfo.timetable.datetable,'timeservice':orderinfo.timeservice,'user':orderinfo.user.last_name,'iteminfo':iteminfo,'discount':orderinfo.discount}) # render with dynamic value
        # text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
        # msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        # msg.attach_alternative(html_content, "text/html")
        # msg.send()
                
                
        return JsonResponse({'message': 'Webhook processed successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)    
    

@api_view(['POST'])
def payTamarabyId(request):
    data=request.data
    print(data)
    paytamara=PayTamara.objects.filter(order_id_tamara=data['data']['order_id_tamara']).first()
    serializer = PayTamaraSerializer(paytamara, many=False)
    return Response(serializer.data)    
    