from django.urls import path
from .views import BasketListView, BasketDetailView

urlpatterns = [
    path("", BasketListView.as_view()),
    path("<int:pk>/", BasketDetailView.as_view())
]
