from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from users.views import UserViewSet
from .views import ProjectViewSet
from users.models import User
from todo.models import Project, ToDo
from mixer.backend.django import mixer


class TestUsersAndProjectView(APITestCase):

    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('admin', email='test@gmail.com', password='8311')
        self.client = APIClient()

    def test_get_users(self):
        factory = APIRequestFactory()
        request = factory.get('api/users/')
        force_authenticate(request, user=self.admin)
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_project(self):
        factory = APIRequestFactory()
        request = factory.post('/api/project/', {
            'url': 'http://127.0.0.1:8000/api/project/2/',
            'title': 'Сделать ДЗ № 3',
            'link': ''
        })
        force_authenticate(request, user=self.admin)
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'Сделать ДЗ № 3')

    def test_client_get_list(self):
        self.client.force_authenticate(self.admin)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_client_mixer_todo(self):
        self.client.force_authenticate(self.admin)
        todo = mixer.blend(ToDo, project__title='Project Title')
        response = self.client.get('/api/ToDo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['text'], todo.text)
