import os

import sys

path = '/var/ysb'

if path not in sys.path:

    sys.path.insert(0, '/var/ysb')

os.environ['DJANGO_SETTINGS_MODULE'] = 'ysb.settings'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()
