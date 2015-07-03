# -*- coding: utf-8-*-
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext

from items.models import Item
from regions.models import Region
from regions.models import Provice

# Create your views here.
def user_info(request):
    template_name = "users/info.html"
    if not 'user_name' in request.session:
        return render_to_response('error.html', {'title': 'Error', 'message': 'You are not logged in'}, context_instance = RequestContext(request))
    user_name = request.session['user_name']
    user = User.objects.get(name = user_name);

    #apps = App.objects.filter(company=user.company)
    from config import params
    return render_to_response(template_name, {'title': 'My information', 'user':user, 'image_base': params.IMAGE_CACHE_BASE_DIR}, context_instance = RequestContext(request))

def new_user(request):
    template_name = "users/register.html"
    regions = Region.objects.all()
    basedir = '/media/'
    #random select
    slider_items = Item.objects.order_by('?')[:4]
    return render_to_response( template_name, {'title': '注册','slider_items':slider_items,'basedir':basedir,'regions':regions},context_instance=RequestContext(request))

def user_login(request):
    template_name = "users/login.html"
    regions = Region.objects.all()
    basedir = '/media/'
    #random select
    slider_items = Item.objects.order_by('?')[:4]
    return render_to_response( template_name, {'title': 'Login','slider_items':slider_items,'basedir':basedir,'regions':regions},context_instance=RequestContext(request))
def user_logout(request):
    template_name = "users/logout.html"
    if request.session.get('user_name') is None:
        return render(request, template_name, {'title': 'Logout', 'message': 'You are not logged in'})
    else:
        del request.session['user_name']
        del request.session['login_time']
        return render(request, template_name, {'title': 'Logout', 'message': 'You have successfully logged out'})
def rest_user_new(request):
	serializer = UserSerializer(data=request.DATA)
	if serializer.is_valid():
		try:
			user = serializer.save()
                	return JSONResponse(serializer.validated_data, status=status.HTTP_201_CREATED)
		except IntegrityError:
			return JSONResponse("user already exist ", status=status.HTTP_417_EXPECTATION_FAILED) 
		except Exception as e:
			print e
			return JSONResponse("invalid format %s "%sys.exc_info()[0], status=status.HTTP_400_BAD_REQUEST) 

	return JSONResponse("invalid data format", status=status.HTTP_400_BAD_REQUEST) 
