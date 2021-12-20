from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, ToDoFilter
from .serializers import ProjectSerializer, ToDoSerializer


class ProjectLimitPaginationSize(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitPaginationSize(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitPaginationSize
    filterset_class = ProjectFilter


class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    pagination_class = ProjectLimitPaginationSize
    filterset_class = ToDoFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
