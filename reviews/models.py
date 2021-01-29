from django.db import models

class Review(models.Model):
    text = models.TextField(max_length=300)
    # Cannot find a way to restrict this from back end - need to limit the user input to >= 1 and <= 5
    rating = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    pie = models.ForeignKey(
        "pies.Pie",
        related_name="reviews",
        # cascade means the whole row will be deleted
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="reviews",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"Review #{self.id} on {self.pie}"