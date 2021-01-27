from rest_framework.serializers import ModelSerializer
from ..models import Basket_Item

class BasketSerializer(ModelSerializer):

    class Meta:
        model = Basket_Item
        fields = '__all__'
