from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()

    def get_queryset(self):
        # ログインユーザーのタスクのみを返す
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # 作成時にユーザーを自動設定
        serializer.save(user=self.request.user)
