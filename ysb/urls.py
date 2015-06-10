from django.conf.urls import patterns, include, url
#from django.contrib import admin
#admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ysb.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include('admin.urls')),
    url(r'^users/', include('users.urls')),
    url(r'^items/', include('items.urls')),
    url(r'^orders/', include('orders.urls')),
#    url(r'^sessions/', include('sessions.urls')),
)
