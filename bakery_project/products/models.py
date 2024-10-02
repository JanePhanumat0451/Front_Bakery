# products/models.py
# products/models.py
from djongo import models
from bson import ObjectId

class Product(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    DELIVERY_METHODS = [
        ('store_pickup', 'Pick up at Store'),
        ('home_delivery', 'Home Delivery'),
    ]

    delivery_method = models.CharField(max_length=20, choices=DELIVERY_METHODS)  # เปลี่ยนจาก payment_method เป็น delivery_method
    address = models.TextField(blank=True, null=True)  # อนุญาตให้เว้นว่างได้กรณีมารับที่ร้าน
    delivery_date = models.DateField(blank=True, null=True)  # อนุญาตให้เว้นว่างได้กรณีมารับที่ร้าน
    delivery_time = models.TimeField(blank=True, null=True)  # อนุญาตให้เว้นว่างได้กรณีมารับที่ร้าน
    map_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.delivery_method}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product_name} - {self.quantity}"