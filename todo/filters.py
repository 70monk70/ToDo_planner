from django_filters import rest_framework as filters
from .models import ToDo, Project


class ProjectFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ('title',)


class ToDoFilter(filters.FilterSet):
    project = filters.ModelChoiceFilter(queryset=Project.objects.all())
    creation_date = filters.DateTimeFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ('project', 'creation_date')
