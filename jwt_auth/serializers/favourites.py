from rest_framework import serializers
from django.contrib.auth import get_user_model
from pies.serializers.common import PieSerializer

User = get_user_model()

class FavouritesUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("favourites", )
        
    # favourites = PieSerializer(many=True)
    