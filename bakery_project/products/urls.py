# products/urls.py
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, OrderViewSet, OrderItemViewSet, OrderItemViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'orderitem', OrderItemViewSet)

urlpatterns = router.urls  # Automatically include all routes for the registered viewsets
