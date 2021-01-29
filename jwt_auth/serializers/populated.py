from jwt_auth.serializers.common import UserSerializer
from pies.serializers.common import PieSerializer

class PopulatedUserSerializer(UserSerializer):
    """ Used for making serialized populated user profile with list of favourite pies """

    favourites = PieSerializer(many=True)