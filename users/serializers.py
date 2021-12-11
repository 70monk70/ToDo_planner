from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from django.contrib.auth import get_user_model


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('url', 'username', 'first_name', 'last_name', 'email', )
