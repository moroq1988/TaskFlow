# Generated by Django 5.0.3 on 2024-12-22 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='タイトル')),
                ('description', models.TextField(blank=True, verbose_name='説明')),
                ('due_date', models.DateField(blank=True, null=True, verbose_name='期限日')),
                ('priority', models.CharField(choices=[('low', '低'), ('medium', '中'), ('high', '高')], default='medium', max_length=10, verbose_name='優先度')),
                ('status', models.CharField(choices=[('todo', '未着手'), ('in_progress', '進行中'), ('done', '完了')], default='todo', max_length=20, verbose_name='ステータス')),
                ('tags', models.JSONField(blank=True, default=list, verbose_name='タグ')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
            ],
            options={
                'verbose_name': 'タスク',
                'verbose_name_plural': 'タスク',
            },
        ),
    ]