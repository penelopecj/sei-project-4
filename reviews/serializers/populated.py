from jwt_auth.serializers.common import UserSerializer
from ..serializers.common import ReviewSerializer

class PopulatedReviewSerializer(ReviewSerializer):
    """ Used for making serialized populated reviews with owners """

    owner = UserSerializer()