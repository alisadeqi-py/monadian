from django.urls import path

from .views import HoldingCompanyListView

urlpatterns = [
    path("", HoldingCompanyListView.as_view(), name="holding-list"),
]
