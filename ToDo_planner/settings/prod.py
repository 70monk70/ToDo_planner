from .base import *

DEBUG = False
ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'ToDo_planner',
        'USER': 'apl',
        'PASSWORD': '123',
        'HOST': 'db',
        'PORT': '5432'
    }
}
