from django.urls import path

from .views import PortfolioItemDetailView, PortfolioItemListView

urlpatterns = [
    path("", PortfolioItemListView.as_view(), name="portfolio-list"),
    path("<int:pk>/", PortfolioItemDetailView.as_view(), name="portfolio-detail"),
]
