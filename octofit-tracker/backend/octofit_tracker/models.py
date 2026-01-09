from djongo import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Champs supplémentaires pour le profil utilisateur
    bio = models.TextField(blank=True)
    avatar = models.URLField(blank=True)

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    members = models.ArrayReferenceField(to=User, on_delete=models.CASCADE, blank=True)

class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(help_text="Durée en minutes")
    date = models.DateTimeField(auto_now_add=True)
    calories_burned = models.PositiveIntegerField(default=0)

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    suggested_for = models.ManyToManyField(User, blank=True)

class LeaderboardEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True, blank=True)
    class Meta:
        ordering = ['-score']
