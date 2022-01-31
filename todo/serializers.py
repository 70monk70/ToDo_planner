from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from rest_framework.relations import PrimaryKeyRelatedField
from users.models import User
from todo.models import Project, ToDo


class ProjectSerializer(ModelSerializer):
    users = PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = Project
        fields = ('id' , 'url', 'title', 'link', 'users')


class ToDoSerializer(ModelSerializer):

    class Meta:
        model = ToDo
        fields = ('id', 'project', 'text', 'creator', 'creation_date', 'update_date', 'is_active')
