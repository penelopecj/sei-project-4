from django.db import models

class Basket_Item(models.Model):
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="basket_items",
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        "pies.Pie",
        related_name="basket_items",
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField()

    def __str__(self):
            return f"Product - {self.product} - Quantity{self.quantity}"
