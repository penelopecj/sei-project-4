from rest_framework import serializers
from ..models import Pie

class PieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pie
        fields = '__all__'