from django.urls import path

from .views import AboutView, ContactCreateView, NewsListView

urlpatterns = [
    path("news/", NewsListView.as_view(), name="news-list"),
    path("about/", AboutView.as_view(), name="about"),
    path("contact/", ContactCreateView.as_view(), name="contact-create"),
]
