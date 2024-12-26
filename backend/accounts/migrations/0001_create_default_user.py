from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_default_user(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    if not User.objects.filter(username='testuser').exists():
        User.objects.create(
            username='testuser',
            password=make_password('testpass123'),
            is_active=True,
            is_staff=True
        )

def reverse_func(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    User.objects.filter(username='testuser').delete()

class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.RunPython(create_default_user, reverse_func),
    ]
