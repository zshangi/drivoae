from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os 

from django.shortcuts import render





def ReactAppView(request):
    try:

        with open(os.path.join(settings.REACT_APP, 'static', 'index.html')) as file:
            return HttpResponse(file.read())

    except :
        return HttpResponse(
            """
            index.html not found ! build your React app !!
            """,
            status=501,
        )