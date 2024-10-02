
# File: products/views.py
from bson import ObjectId
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.http import Http404
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer, OrderItemSerializer
from rest_framework.decorators import api_view


# ProductViewSet สำหรับการจัดการสินค้า
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_object(self, pk):
        try:
            return Product.objects.get(id=ObjectId(pk))  # แปลงเป็น ObjectId สำหรับ MongoDB
        except Product.DoesNotExist:
            raise Http404

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object(kwargs['pk'])  # ดึงสินค้าตาม ObjectId
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object(kwargs['pk'])  # ดึงสินค้าตาม ObjectId
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object(kwargs['pk'])  # ลบสินค้าตาม ObjectId
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


# OrderViewSet สำหรับการจัดการคำสั่งซื้อ
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer