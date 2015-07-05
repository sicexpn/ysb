from django.contrib import admin
from models import Item,Photo
# Register your models here.
class PhotoInline(admin.StackedInline):
	model=Photo
	extra=3
class ItemAdmin(admin.ModelAdmin):
	inlines=[PhotoInline]
admin.site.register(Item,ItemAdmin)
