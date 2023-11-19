from django.db.models.signals import pre_save
from django.contrib.auth.models import User


def updateUser(sender, instance, **kwargs):
    user = instance




pre_save.connect(receiver=updateUser, sender=User)
