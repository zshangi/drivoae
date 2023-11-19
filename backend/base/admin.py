from django.contrib import admin
from .models import *
from django.utils.html import format_html
from django.urls import reverse
import decimal

admin.site.register(Review)
admin.site.register(Tyre)
admin.site.register(Brand)
admin.site.register(Origin)

class ShippingAddressfilter(admin.ModelAdmin):
    list_display = ('order', 'user','address')
admin.site.register(ShippingAddress,ShippingAddressfilter)
# Order Display

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

class invoicefilter(admin.ModelAdmin):
    list_filter = [
         "isPaid",
         "isDelivered",
         "service",
         "createdAt"
    ]
    inlines = [OrderItemInline]

    def profit(self, obj):
        x=obj.totalPrice - obj.totalCost
        return x
        
    def view_custom_template(self, obj):
        url = reverse('custom_template_view', args=[obj.pk])
        return format_html('<a class="button" href="{}">Invoice</a>', url)
    
    def view_job_order(self, obj):
        url = reverse('job_order_view', args=[obj.pk])
        return format_html('<a class="button" href="{}">JobOrder</a>', url)
    
    def details_order(self, obj):
        url = reverse('details_order_view', args=[obj.pk])
        return format_html('<a class="button" href="{}">Details</a>', url)

    def get_order_items(self, obj):
        # Custom method to get a comma-separated list of order item names
        return ", ".join(item.tyreproduct.name for item in obj.orderitem_set.all())
        
    def user_info(self,obj):
        return obj.user.first_name + obj.user.last_name
   
    list_display = ('user_info', 'servicecenter', 'service','timetable','timeservice','totalPrice','isPaid','createdAt','get_order_items','status','view_custom_template','view_job_order','details_order','profit')
    def get_list_dispaly(self,request):
    # Check if the user belongs to the 'editor' group
        if request.user.groups.filter(name='salesperson').exists() :
            return ('user_info', 'get_order_items','status','view_custom_template','view_job_order','details_order')
        else:
            return self.list_display 

    user_info.short_description="Customer"
    profit.short_description="profit"
    view_custom_template.short_description = "Invoice"
    view_job_order.short_description = "Job Order"
    get_order_items.short_description = 'Order Items' 
    details_order.short_description='Order Details'


admin.site.register(Order, invoicefilter)
# ---------------------------------------------------------------------------------------------------------------------------------------------------------------




class voucherfilter(admin.ModelAdmin):
    list_display = ('title', 'voucher', 'typeVoucher','amount','desc')
admin.site.register(Voucher,voucherfilter)



class VehicleUserfilter(admin.ModelAdmin):
    list_filter = [
         "user",
         "trim",
    ]
    list_display = ('user','trim','main')
admin.site.register(VehicleUser,VehicleUserfilter)


class LabelCodefilter(admin.ModelAdmin):
    list_filter = [
         "label",
         "hexCode",
    ]
    list_display = ('label','hexCode')
admin.site.register(LabelCode,LabelCodefilter)


class TyreProductfilter(admin.ModelAdmin):
    list_filter = [
         "brandorigin",
         "tyre",
    ]
    list_display = ('brandorigin','countInStock','price','tyre','brandpattern','productionYear')
admin.site.register(TyreProduct,TyreProductfilter)


class ServiceCenterfilter(admin.ModelAdmin):
    list_filter = [
         "tyreServiceCenter",
    ]
    list_display = ('name','user','address','tel','tyreServiceCenter')
admin.site.register(ServiceCenter,ServiceCenterfilter)


class PayStripefilter(admin.ModelAdmin):
    list_filter = [
         "user",
    ]
    list_display = ('user','order','customer_id','payment_intent_id','amount')
admin.site.register(PayStripe,PayStripefilter)



class BrandPatternfilter(admin.ModelAdmin):
    list_filter = [
         "brand",
         "pattern"
    ]
    list_display = ('brand','pattern')
admin.site.register(BrandPattern,BrandPatternfilter)


class Brandoriginfilter(admin.ModelAdmin):
    list_filter = [
         "brand",
         "origin"
    ]
    list_display = ('brand','origin')
admin.site.register(Brandorigin,Brandoriginfilter)




class Timetablefilter(admin.ModelAdmin):
    list_filter = [
         "servicecenter",
         "datetable",
         "part_AM",
         "part_PM",
    ]
    list_display = ('servicecenter','datetable','part_AM','part_PM','isAvailable')
admin.site.register(Timetable,Timetablefilter)



class Makefilter(admin.ModelAdmin):
    list_filter = [
         "slug",
         "make",
    ]
    list_display = ('slug','make')
admin.site.register(Make,Makefilter)


class Modelfilter(admin.ModelAdmin):
    list_filter = [
         "make",
         "year"
    ]
    list_display = ('model','model_slug','make','year')
admin.site.register(Model,Modelfilter)


class Modificationfilter(admin.ModelAdmin):
    list_filter = [
         "model",

    ]
    list_display = ('model','trim','trim_slug')
admin.site.register(Modification,Modificationfilter)


class VehicleTyrefilter(admin.ModelAdmin):
    list_filter = [
         "modification",
         "tyre",
         "model",
         "wheels",

    ]
    list_display = ('modification','tyre','model','wheels')
admin.site.register(VehicleTyre,VehicleTyrefilter)

class PayTamarafilter(admin.ModelAdmin):

    list_display = ('user','order','order_id_tamara','checkout_id','status','createdAt','lastUpdate')
admin.site.register(PayTamara,PayTamarafilter)
