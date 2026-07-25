from django.urls import path

from .views import CareerApplicationCreateView

urlpatterns = [
    path("", CareerApplicationCreateView.as_view(), name="career-application-create"),
]
