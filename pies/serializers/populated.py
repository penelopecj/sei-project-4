from categories.serializers.common import CategorySerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from ..serializers.common import PieSerializer

class PopulatedPieSerializer(PieSerializer):
    """ Used for making serialized populated pies with categories """

    categories = CategorySerializer(many=True)
    reviews = PopulatedReviewSerializer(many=True)