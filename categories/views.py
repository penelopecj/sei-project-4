from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedCategorySerializer
from .models import Category

class CategoryListView(APIView):
    """ View for GET requests to '/categories' """

    def get(self, _request):
        categories = Category.objects.all()
        serialized_categories = PopulatedCategorySerializer(categories, many=True)
        return Response(serialized_categories.data, status=status.HTTP_200_OK)