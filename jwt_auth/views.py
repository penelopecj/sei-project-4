from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer
from .serializers.favourites import FavouritesUserSerializer
User = get_user_model()

class RegisterView(APIView):
    ''' Controller for post request to /auth/register '''

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response(
                {'message': 'Registration Successful'},
                status=status.HTTP_201_CREATED
            )
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    ''' Controller for post request to /auth/login '''

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials')
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')
        expiry_time = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp':  int(expiry_time.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        return Response(
            {'token': token, 'message': f'Welcome Back {user_to_login.username}'}
        )

class ProfileView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

# class UserView(APIView):

#     def get(self, _request):
#         users = User.objects.all()
#         serialized_users = UserSerializer(users, many=True)
#         return Response(serialized_users.data, status=status.HTTP_200_OK)

class UserDetailView(APIView):
    """ View for GET and POST requests to 'api/auth/users/pk/' """

    permission_classes = (IsAuthenticated, )

    def get(self, _request, pk):
        user = User.objects.get(pk=pk)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)
        
    def put(self, request, pk):
        user_to_update = User.objects.get(pk=pk)
        updated_user = FavouritesUserSerializer(user_to_update, data=request.data)
        if updated_user.is_valid():
            updated_user.save()
            return Response(updated_user.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
