from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Tyre
from base.serializers import TyreSerializer


@api_view(['GET'])
def gettyre(request):
        tyre = Tyre.objects.filter(flag=1).order_by('width','profile','diameter')
        serializer = TyreSerializer(tyre,many=True)
        return Response(serializer.data)


