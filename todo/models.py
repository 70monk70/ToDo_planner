from django.db import models
from django.contrib.auth import get_user_model


class Project(models.Model):
    title = models.CharField(verbose_name='Название', max_length=255)
    link = models.URLField(verbose_name='Ссылка на репозиторий', blank=True)
    users = models.ManyToManyField(get_user_model(), verbose_name='Пользователи')

    def __str__(self):
        return f'{self.title} | Проект № {self.id}'

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='Проект')
    creator = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, verbose_name='Автор')
    text = models.TextField('Текст задачи')
    creation_date = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    update_date = models.DateTimeField(verbose_name='Дата обновления', auto_now=True)
    is_active = models.BooleanField(verbose_name='Статус', default=True)

    def __str__(self):
        return f'{self.project.title} | Задача № {self.id} | {self.creator.username}'

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'
