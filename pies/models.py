from django.db import models

class Pie(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=500)
    image = models.CharField(max_length=300)
    price = models.FloatField()
    categories = models.ManyToManyField('categories.Category', related_name='pies')

    def __str__(self):
            return f"{self.name} - £{self.price}"