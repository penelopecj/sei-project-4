from django.db import models

class Pie(models.Model):
  name = models.CharField(max_length=50, unique=True)
  description = models.CharField(max_length=300)
  image = models.CharField(max_length=300)
  price = models.FloatField()

  def __str__(self):
      return f"{self.name} - £{self.price}"