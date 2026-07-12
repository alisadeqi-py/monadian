"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import RedirectView
from django.views.static import serve as serve_static

from . import admin_site  # noqa: F401  (sets Farsi admin site header/title)

urlpatterns = [
    path("", RedirectView.as_view(url="/admin/", permanent=False)),
    path("admin/", admin.site.urls),
    path("api/contact/", include("contact.urls")),
    path("api/holdings/", include("holdings.urls")),
    path("api/portfolio/", include("portfolio.urls")),
    path("api/newsletter/", include("newsletter.urls")),
]

# Served unconditionally (not just in DEBUG) because this deploys as a
# single container with no nginx/CDN in front to hand off /media/ to.
# django.conf.urls.static.static() can't be used here — it silently returns
# zero URL patterns whenever DEBUG=False, which is exactly what was making
# every /media/ request 404 in production despite the files existing on
# disk. Registering the view directly bypasses that DEBUG check.
urlpatterns += [
    re_path(r"^media/(?P<path>.*)$", serve_static, {"document_root": settings.MEDIA_ROOT}),
]
