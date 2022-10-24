"""
Django settings for cs2admin project.

Generated by 'django-admin startproject' using Django 3.2.12.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path

#uploading a file
import os



# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-efqvrio34986ib-f1*zkw28@&0tcj+#ijvdb0j)-#4sl0qq9k7'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'knox',  
    
  
    #our apps
    'uploadfile',
    'database',
    'analysis',
    'authentication',
     'rest_framework',
     'corsheaders',


    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'cs2admin.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR /'cs2admin/static/templates'
           ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cs2admin.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILE_DIRS =[
    BASE_DIR / 'static'
]


# settings for django-webpack-loader
STATIC_ROOT = os.path.join(BASE_DIR, 'public')
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'dist'),
)
WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': ['.+\\.hot-update.js', '.+\\.map']
    }
}
# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

LOGIN_REDIRECT_URL = '/display'

MEDIA_URL = "/media/"                                 # add this 
MEDIA_ROOT = os.path.join(BASE_DIR, 'uploadfile/static/media') 
CORS_ORIGIN_ALLOW_ALL = True
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication'),'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.AllowAny']
}
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_POR = 587
EMAIL_HOST_USER = 'uct.capstone@gmail.com'
EMAIL_HOST_PASSWORD = 'uriintaupquttnqu'

EMAIL_USE_TLS = True
EMAIL_USE_SSL= False

CORS_ORIGIN_ALLOW_ALL=True




