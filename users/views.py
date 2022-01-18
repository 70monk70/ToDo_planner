from rest_framework.viewsets import GenericViewSet
from .serializers import UserSerializer, UserSerializerV2
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from django.contrib.auth import get_user_model


class UserViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.request.version == '2':
            return UserSerializerV2
        return UserSerializer
