from rest_framework.serializers import ModelSerializer
from ..models import Basket_Item

class BasketQuantitySerializer(ModelSerializer):

    class Meta:
        model = Basket_Item
        fields = ("quantity", )