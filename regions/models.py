# -*- coding: utf-8 -*-  
from django.db import models
from django.contrib import admin
from datetime import datetime

# Create your models here.
class Region(models.Model):
    name = models.CharField(max_length=250,verbose_name='区域名称')
    class meta:
        ordering = ['name']
         
    def __unicode__(self):
        return self.name
     
    @models.permalink
    def get_absolute_url(self):
        return ('region_detail', None, {'object_id':self.id})

class Provice(models.Model):
    region = models.ForeignKey(Region)
    name = models.CharField(max_length=250,verbose_name='省份名称')
    class meta:
	ordering = ['name']
    @models.permalink
    def get_absolute_url(self):
        return ('provice_detail', None, {'object_id':self.id})	

class ProviceInline(admin.StackedInline):
    model = Provice
    extra = 3	
class RegionAdmin(admin.ModelAdmin):
    inlines = [ProviceInline]
