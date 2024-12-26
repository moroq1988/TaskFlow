from django.db import models

class Task(models.Model):
    class Priority(models.TextChoices):
        LOW = "low", "低"
        MEDIUM = "medium", "中"
        HIGH = "high", "高"

    class Status(models.TextChoices):
        TODO = "todo", "未着手"
        IN_PROGRESS = "in_progress", "進行中"
        DONE = "done", "完了"

    title = models.CharField("タイトル", max_length=200)
    description = models.TextField("説明", blank=True)
    due_date = models.DateField("期限日", null=True, blank=True)
    priority = models.CharField(
        "優先度",
        max_length=10,
        choices=Priority.choices,
        default=Priority.MEDIUM
    )
    status = models.CharField(
        "ステータス",
        max_length=20,
        choices=Status.choices,
        default=Status.TODO
    )
    tags = models.JSONField("タグ", default=list, blank=True)
    created_at = models.DateTimeField("作成日時", auto_now_add=True)
    updated_at = models.DateTimeField("更新日時", auto_now=True)

    class Meta:
        verbose_name = "タスク"
        verbose_name_plural = "タスク"

    def __str__(self):
        return self.title
