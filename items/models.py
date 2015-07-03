# -*- coding: utf-8 -*-  
from django.db import models
from django.contrib import admin
from datetime import datetime

# Create your models here.
'''class Item(models.Model):
	#id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=200,unique=True)
	price = models.FloatField()
	image = models.ImageField(upload_to='upload_image/',height_field=200,width_field=200)
	date = models.DateTimeField(default=datetime.now())

	to_str={'name':name,'price':price}
	def __str__(self):
		return to_str
'''
class Item(models.Model):
    name = models.CharField(max_length=250,verbose_name='名称')
    price = models.FloatField(verbose_name='价格')
    description = models.TextField(verbose_name='描述')
    date = models.DateTimeField(default=datetime.now(),verbose_name='时间')

    image = models.ImageField(upload_to='photos/originals/%Y/%m/',verbose_name='图片')
    class meta:
        ordering = ['name']
         
    def __unicode__(self):
        return self.name
     
    @models.permalink
    def get_absolute_url(self):
        return ('item_detail', None, {'object_id':self.id})
 
 
'''class Photo(models.Model):
    item = models.ForeignKey(Item)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='photos/originals/%Y/%m/')

    caption = models.CharField(max_length=250, blank=True)
     
    class Meta:
        ordering = ["title"]
         
    def __unicode__(self):
        return self.title
     
    @models.permalink
    def get_absolute_url(self):
        return ('photo_detail', None, {'object_id':self.id})
    def __str__(self):
	return "%s"%self.title
''' 
class PhotoInline(admin.StackedInline):
    model = Item
     
class ItemAdmin(admin.ModelAdmin):
    inlines = [PhotoInline]
