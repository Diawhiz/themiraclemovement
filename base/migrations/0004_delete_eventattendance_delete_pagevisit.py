# Generated by Django 5.1.2 on 2024-11-01 23:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_eventattendance_pagevisit'),
    ]

    operations = [
        migrations.DeleteModel(
            name='EventAttendance',
        ),
        migrations.DeleteModel(
            name='PageVisit',
        ),
    ]
