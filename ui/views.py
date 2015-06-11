# -*- encoding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext

from items.models import Item
# Create your views here.
def ui_index(request):
	template_name='ui/index.html'
	print template_name
	title = '养生之宝'

	items = Item.objects.all()
	basedir = '/media/'
	return render_to_response(template_name, {'title': title,'items':items,'basedir':basedir}, context_instance = RequestContext(request))
