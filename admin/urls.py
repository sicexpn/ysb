from admin.views import * 
from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'restapp.views.home', name='home'),
    # url(r'^restapp/', include('restapp.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    #(r'^users/$', UserView.as_view()),  
    #(r'^users/(?P<name>.+)$', UserView.as_view()),  
)

