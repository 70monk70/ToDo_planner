from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from rest_framework.relations import PrimaryKeyRelatedField
from users.models import User
from todo.models import Project, ToDo


class ProjectSerializer(HyperlinkedModelSerializer):
    users = PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'
