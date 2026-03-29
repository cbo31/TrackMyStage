from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.email

class Application(models.Model):
    STATUS_CHOICES = [
        ('sent', 'Envoyée'),
        ('to_apply', 'A Postuler'),
        ('no_response', 'Sans réponse'),
        ('interview', 'Entretien'),
        ('rejected', 'Refusé'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="applications")
    company = models.CharField(max_length=100)
    city = models.CharField(max_length=100, blank=True)
    position = models.CharField(max_length=100)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='to_apply')
    contact = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.company} - {self.position}"


