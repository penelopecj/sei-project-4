from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=50, blank=True)
    profile_image = models.CharField(max_length=300, blank=True)
    favourites = models.ManyToManyField('pies.Pie', related_name='users', blank=True)