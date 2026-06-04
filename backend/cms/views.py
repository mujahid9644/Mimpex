from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CompanyProfile, ContactLead, NewsItem
from .models import CareerMilestone, Director
from .serializers import (
    CareerMilestoneSerializer,
    CompanyProfileSerializer,
    ContactLeadSerializer,
    DirectorSerializer,
    NewsItemSerializer,
)


class NewsListView(generics.ListAPIView):
    queryset = NewsItem.objects.all()[:20]
    serializer_class = NewsItemSerializer


class AboutView(APIView):
    def get(self, request):
        profile = CompanyProfile.objects.first()
        if not profile:
            return Response({"detail": "Profile not configured"}, status=status.HTTP_404_NOT_FOUND)
        return Response(
            {
                "profile": CompanyProfileSerializer(profile).data,
                "directors": DirectorSerializer(Director.objects.all(), many=True).data,
                "milestones": CareerMilestoneSerializer(CareerMilestone.objects.all(), many=True).data,
            }
        )


class ContactCreateView(generics.CreateAPIView):
    queryset = ContactLead.objects.all()
    serializer_class = ContactLeadSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"detail": "Thank you. Our team will contact you shortly."}, status=status.HTTP_201_CREATED)
