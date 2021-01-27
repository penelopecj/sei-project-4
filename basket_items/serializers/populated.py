from jwt_auth.serializers.common import NestedUserSerializer
from ..serializers.common import BasketSerializer

class PopulatedBasketSerializer(BasketSerializer):

    owner = NestedUserSerializer()
