from pies.serializers.common import PieSerializer
from ..serializers.common import CategorySerializer

class PopulatedCategorySerializer(CategorySerializer):
    """ Used for all shared outgoing serialization """
    
    pies = PieSerializer(many=True)