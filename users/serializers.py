from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from django.contrib.auth import get_user_model


class UserSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        # fields = ('url', 'username', 'first_name', 'last_name', 'email', )
        fields = ('id', 'username', 'first_name', 'last_name', 'email')


class UserSerializerV2(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser')
