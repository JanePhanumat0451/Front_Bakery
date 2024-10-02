import json
from rest_framework import serializers
from .models import Product, Order, OrderItem

# ProductSerializer สำหรับการจัดการสินค้า
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'type', 'description', 'price', 'image']


# OrderItemSerializer สำหรับการจัดการรายการสินค้าภายในคำสั่งซื้อ
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product_name', 'product_price', 'quantity']


# OrderSerializer สำหรับการจัดการคำสั่งซื้อ
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        # แก้ไข field 'payment_method' เป็น 'delivery_method' และลบ 'bank_slip' ออก
        fields = ['id', 'delivery_method', 'address', 'delivery_date', 'delivery_time', 'map_link', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        # ตรวจสอบว่า items_data เป็น JSON string แล้วแปลงเป็น list
        if isinstance(items_data, str):
            items_data = json.loads(items_data)
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    def validate_map_link(self, value):
    # ตรวจสอบว่ามีค่าและไม่เป็น None ก่อน
        if value and not value.startswith('http'):
            raise serializers.ValidationError("Enter a valid URL.")
        return value


