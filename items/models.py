from django.db import models
from datetime import datetime
# Create your models here.
class Item(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=200,unique=True)
	price = models.FloatField()
	image = models.ImageField(upload_to='upload_image/',height_field=200,width_field=200)
	date = models.DateTimeField(default=datetime.now())

	to_str={'name':name,'price':price}
	def __str__(self):
		return to_str

