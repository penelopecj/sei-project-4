from django.urls import path
from .views import PieListView, PieDetailView

urlpatterns = [
    # Create URL route for pies index page
    path("", PieListView.as_view()),
    path("<int:pk>/", PieDetailView.as_view())
]