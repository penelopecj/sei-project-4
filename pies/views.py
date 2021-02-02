from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

# Un-comment the below when user authentication is ready:
# from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Pie
from .serializers.common import PieSerializer
from .serializers.populated import PopulatedPieSerializer

class PieListView(APIView):
    """ View for GET and POST requests to 'api/pies/' """

    # GET request for all pies index page
    def get(self, _request):
        # GET all the pies
        pies = Pie.objects.all()
        # Serialize all the pies
        serialized_pies = PieSerializer(pies, many=True)
        return Response(serialized_pies.data, status=status.HTTP_200_OK)

    def post(self, request):
        pie_to_create = PieSerializer(data=request.data)
        if pie_to_create.is_valid():
            pie_to_create.save()
            return Response(pie_to_create.data, status=status.HTTP_201_CREATED)
        return Response(pie_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class PieDetailView(APIView):
    """ View for GET and PUT and DELETE requests to 'api/pies/pk/' """
    def get_pie(self, pk):
        """ Checks if pie PK exists """
        try:
            return Pie.objects.get(pk=pk)
        except Pie.DoesNotExist:
            raise NotFound()
    
    def get(self, _request, pk):
        pie = self.get_pie(pk=pk)
        serialized_pie = PopulatedPieSerializer(pie)
        return Response(serialized_pie.data, status=status.HTTP_200_OK)
        
