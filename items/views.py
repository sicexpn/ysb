from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext


# Create your views here.
def item_create(request):
	template_name='items/item_create.html'
	print template_name
	title = 'item create'
	return render_to_response(template_name, {'title': title}, context_instance = RequestContext(request))
