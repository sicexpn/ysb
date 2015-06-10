#coding=utf-8
from django.db import models
from datetime import datetime


# Create your models here.
class User(models.Model):
	Female = 'F'
	Male = 'M'
	SEX_CHOICES= (('F','女'),('M','男'))
	# define Field
	#id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=200)
	sex = models.CharField(max_length=1,choices=SEX_CHOICES,default=Male)
	phone = models.CharField(max_length=48)
	email = models.EmailField(unique=True)
	address = models.TextField()
	password = models.CharField(max_length=200)
	date = models.DateTimeField(default=datetime.now())

	to_str = {'name':name,'sex':sex,'phone':phone,'email':email,'address':address}
	def __str__(self):
		return to_str
