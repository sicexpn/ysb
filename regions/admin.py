from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.Region,models.RegionAdmin)
#admin.site.register(models.Provice)
