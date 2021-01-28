from jwt_auth.serializers.common import UserSerializer
from pies.serializers.common import PieSerializer
from ..serializers.common import BasketSerializer

class PopulatedBasketSerializer(BasketSerializer):

    owner = UserSerializer()
    product = PieSerializer()