# -*- encoding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext

from items.models import Item
from regions.models import Region
from regions.models import Provice
# Create your views here.
def ui_index(request):
	template_name='ui/index.html'
	print template_name
	title = '养生之宝'

	#products
	items = Item.objects.all()
	#regions
	regions = Region.objects.all()
	basedir = '/media/'
	#random select
	slider_items = Item.objects.order_by('?')[:4]
	return render_to_response(template_name, {'slider_items':slider_items,'title': title,'items':items,'basedir':basedir,'regions':regions}, context_instance = RequestContext(request))
