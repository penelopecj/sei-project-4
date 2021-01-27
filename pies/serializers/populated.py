from categories.serializers.common import CategorySerializer
from ..serializers.common import PieSerializer

class PopulatedPieSerializer(PieSerializer):
    """ Used for making serialized populated pies with categories """

    categories = CategorySerializer(many=True)