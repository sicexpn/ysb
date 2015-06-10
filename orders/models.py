from django.db import models
from datetime import datetime
from users.models import User 
from items.models import Item

# Create your models here.
class Order(models.Model):
	id = models.AutoField(primary_key=True)
	user = models.ForeignKey(User)
	item = models.ForeignKey(Item)
	nums = models.IntegerField()
	date = models.DateTimeField(default=datetime.now())
	
	to_str={'user':user,'item':item,'nums':nums}
	def __str__(self):
		return to_str
