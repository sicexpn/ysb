from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ysb.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$',include('ui.urls')),	
    url(r'^static/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_ROOT}),
    url(r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root': settings.MEDIA_ROOT}),
    #url(r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root': settings.FILE_UPLOAD_TEMP_DIR}),
    url(r'^admin/', include(admin.site.urls)),
#   url(r'^admin/', include('admin.urls')),
    url(r'^users/', include('users.urls')),
    url(r'^items/', include('items.urls')),
    url(r'^orders/', include('orders.urls')),

#    url(r'^sessions/', include('sessions.urls')),
)
#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
