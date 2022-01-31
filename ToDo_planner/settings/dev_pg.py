from .base import *

DEBUG = True
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'ToDo_planner',
        'USER': 'apl',
        'PASSWORD': '123',
        'HOST': '127.0.0.1',
        'PORT': '54325'
    }
}
