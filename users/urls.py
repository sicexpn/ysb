from django.conf.urls import patterns, include, url
from views import * 
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'restapp.views.home', name='home'),
    # url(r'^restapp/', include('restapp.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    #url(r'^create/$','item_create'),  
    #url(r'^items/(?P<name>.+)$', ItemView.as_view()),  
    (r'^$', user_info),  
    (r'^login$', user_login),  
    (r'^logout$', user_logout),  
    (r'^new$', new_user),
    (r'^/users/rest_user_new$', rest_user_new),
)

