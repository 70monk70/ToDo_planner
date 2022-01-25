import graphene
from graphene_django import DjangoObjectType
from todo.models import ToDo, Project
from users.models import User


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)
        id = graphene.Int(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, first_name, last_name, id):
        user = User.objects.get(pk=id)
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if first_name or last_name:
            user.save()
        return UserUpdateMutation(user=user)


class Mutations(graphene.ObjectType):
    update_user = UserUpdateMutation.Field()


class Query(graphene.ObjectType):
    all_todo = graphene.List(ToDoType)
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    todo_by_user_firstname = graphene.List(ToDoType, name=graphene.String(required=False))
    projects = graphene.Field(ProjectType, id=graphene.Int(required=True))

    def resolve_all_todo(root, info):
        return ToDo.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def resolve_todo_by_user_firstname(root,info, name=None):
        todo = ToDo.objects.all()
        if name:
            todo = ToDo.objects.filter(creator__first_name=name)
        return todo

    def resolve_projects(root, info, id):
        try:
            project = Project.objects.get(pk=id)
        except Project.DoesNotExist:
            project = None
        return project

# На фронтэнде запрос будет выглядеть следующим образом:
# {
#   projects(id: 2) {
#     title
#     users{
#       id
#       lastName
#       firstName
#     }
#     todoSet{
#       text
#     }
#   }
# }

schema = graphene.Schema(query=Query, mutation=Mutations)
