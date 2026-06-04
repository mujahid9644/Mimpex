from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from diagnostics.models import DiagnosticLog
from products.models import Product
from products.serializers import ProductAdminSerializer


DEFAULT_HEATMAP = [
    {"region": "রাজশাহী", "disease": "আম এনথ্রাকনোজ", "intensity": 84, "cases": 132},
    {"region": "রংপুর", "disease": "আলু লেট ব্লাইট", "intensity": 72, "cases": 96},
    {"region": "যশোর", "disease": "সবজি ফল ছিদ্রকারী", "intensity": 64, "cases": 81},
    {"region": "বরিশাল", "disease": "ধান ব্লাস্ট", "intensity": 58, "cases": 69},
    {"region": "সিলেট", "disease": "চা আগাছা", "intensity": 42, "cases": 37},
]


class DashboardStatsView(APIView):
    def get(self, request):
        products = Product.objects.filter(is_verified_matrix=True)
        diagnostics = DiagnosticLog.objects.count()
        low_stock = products.filter(stock_status="low_stock").count()
        out_stock = products.filter(stock_status="out_of_stock").count()

        return Response(
            {
                "total_sales_bdt": 12_450_000,
                "active_dealers": 248,
                "revenue_delta_percent": 18.4,
                "dealer_delta_percent": 7.8,
                "crops_diagnosed_ai": diagnostics,
                "products_in_catalog": products.count(),
                "stock_summary": {
                    "in_stock": products.filter(stock_status="in_stock").count(),
                    "low_stock": low_stock,
                    "out_of_stock": out_stock,
                },
                "diagnostic_heatmap": DEFAULT_HEATMAP,
            }
        )


class AdminProductListCreateView(APIView):
    def get(self, request):
        qs = Product.objects.all().order_by("matrix_id")
        return Response(ProductAdminSerializer(qs, many=True).data)

    def post(self, request):
        serializer = ProductAdminSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        return Response(ProductAdminSerializer(product).data, status=status.HTTP_201_CREATED)


class AdminProductDetailView(APIView):
    def patch(self, request, matrix_id):
        try:
            product = Product.objects.get(matrix_id=matrix_id)
        except Product.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductAdminSerializer(product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, matrix_id):
        deleted, _ = Product.objects.filter(matrix_id=matrix_id).delete()
        if not deleted:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminDiagnosticListView(APIView):
    def get(self, request):
        qs = DiagnosticLog.objects.all()[:100]
        data = [
            {
                "id": log.id,
                "crop_type": log.crop_type,
                "condition": log.condition,
                "matched_product_id": log.matched_product_id,
                "created_at": log.created_at.isoformat(),
            }
            for log in qs
        ]
        return Response(data)
