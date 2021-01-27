from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers.common import BasketSerializer
from .models import Basket_Item

class BasketListView(APIView):
    """ Controller for post request to /basket_item endpoint """

    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data["owner"] = request.user.id
        basket = BasketSerializer(data=request.data)
        if basket.is_valid():
            basket.save()
            return Response(basket.data, status=status.HTTP_201_CREATED)
        return Response(basket.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, _request):
        basket_items = Basket_Item.objects.all()
        serialized_items = BasketSerializer(basket_items, many=True)
        return Response(serialized_items.data, status=status.HTTP_200_OK)

class BasketDetailView(APIView):
    """ Controller for delete requests to /basket_item/id(pk) endpoint """

    permission_classes = (IsAuthenticated, )

    def delete(self, request, pk):
        try:
            basket_to_delete = BasketItem.objects.get(pk=pk)
            if basket_to_delete.owner.id != request.user.id:
                raise PermissionDenied()
            basket_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except BasketItem.DoesNotExist:
            raise NotFound()
