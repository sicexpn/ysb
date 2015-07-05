# -*- coding: utf-8 -*-  
import sys
import time 
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from users.models import User 
from users.serializers import UserSerializer 
from django.db import * 
from django.core.exceptions import * 
from django.db.models import Q
 

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders it's content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)
 

class UserSessionView(generics.RetrieveUpdateDestroyAPIView):
    def get(self, request):
        return render(request, template_name, {'title': '用户注册'})

    def post(self, request, format=None):
        username = request.DATA.get("email")
        password = request.DATA.get("password")

        try:
            user = User.objects.get(Q(name = username)|Q(email = username) & Q(password=password));
            request.session['user_name'] = user.name 
            request.session['login_time'] =  time.time() 
            serializer = UserSerializer(user)
            return JSONResponse(serializer.data, status=status.HTTP_200_OK) 
        except User.DoesNotExist:
            return JSONResponse("user/password mismatch", status=status.HTTP_404_NOT_FOUND) 
            
