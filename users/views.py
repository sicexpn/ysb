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
 

class UserView(generics.RetrieveUpdateDestroyAPIView):
    """
    Provides access to individual users.
    """
    def get(self, request, rid):
        try:
            return User.objects.get(pk=rid)
        except ObjectDoesNotExist:
            return JSONResponse("user not found", status=status.HTTP_404_NOT_FOUND) 

    def get(self, request):
        all_users = User.objects.all()
        serializer = UserSerializer(all_users, many=True)
        return JSONResponse(serializer.data) 

    def put(self, request, user_name, format=None):
        try:
            user = User.objects.get(name=user_name)
        except ObjectDoesNotExist:
            return JSONResponse("user %s not found"%user_name, status=status.HTTP_404_NOT_FOUND) 
        data = request.DATA
        print data
        needSave = False
        if not "type" in data:
            return JSONResponse("Missing update type", status=status.HTTP_400_BAD_REQUEST)
        if data["type"]=="bedev":
            if not "roles" in data or not "company" in data or data["roles"].strip() == "" or data["company"].strip() == "":
                return JSONResponse("role and company can not be empty", status=status.HTTP_400_BAD_REQUEST)
            if "roles" in data:
                user.roles = data["roles"]
                request.session['roles'] =  user.roles 
                needSave = True;
        elif data["type"]=="update":
            if "roles" in data:
                user.roles = data["roles"]
                request.session['roles'] =  user.roles 
                needSave = True;
            if "company" in data:
                user.company = data["company"]
                needSave = True;
            if "password" in data:
                user.password = data["password"]
                needSave = True;
            if "email" in data:
                user.email = data["email"]
                needSave = True;
            if "sc" in data:
                user.sc = data["sc"]
                needSave = True;
        if needSave: 
            user.save()
        serializer = UserSerializer(user)
        return JSONResponse(serializer.data, status=status.HTTP_200_OK) 



    def post(self, request, format=None):
        serializer = UserSerializer(data=request.DATA)
        if serializer.is_valid():
            try:
                user = serializer.save()
                return JSONResponse(serializer.validated_data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return JSONResponse("user already exist ", status=status.HTTP_417_EXPECTATION_FAILED) 
            except Exception as e:
                print e
                return JSONResponse("invalid format %s "%sys.exc_info()[0], status=status.HTTP_400_BAD_REQUEST) 

        return JSONResponse("invalid data format", status=status.HTTP_400_BAD_REQUEST) 


