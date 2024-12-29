<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Task } from "../types/task";
import AppSnackbar from "./AppSnackbar.vue";
import apiClient from "@/api/client";
import axios from "axios";

const router = useRouter();
const tasks = ref<Task[]>([]);
const dialog = ref(false);
const taskToDelete = ref<number | null>(null);
const snackbar = ref(false);
const snackbarMessage = ref("");

const fetchTasks = async () => {
  try {
    const response = await apiClient.get("/tasks/");
    tasks.value = response.data;
  } catch (error) {
    console.error("エラー:", error);
    if (error instanceof Response && error.status === 401) {
      router.push("/login");
    }
  }
};

const goToDetail = (taskId: number) => {
  router.push(`/tasks/${taskId}`);
};

const openDeleteDialog = (taskId: number, event: Event) => {
  event.stopPropagation();
  taskToDelete.value = taskId;
  dialog.value = true;
};

const handleDelete = async () => {
  if (!taskToDelete.value) return;

  try {
    const response = await apiClient.delete(`/tasks/${taskToDelete.value}/`);
    console.log("タスク削除成功:", response.data);

    await fetchTasks();
    dialog.value = false;
    snackbarMessage.value = "タスクの削除が完了しました";
    snackbar.value = true;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      snackbarMessage.value =
        e.response?.data?.error || "タスクの削除に失敗しました";
    } else {
      snackbarMessage.value = "予期せぬエラーが発生しました";
    }
    snackbar.value = true;
    console.error("タスク削除エラー:", e);
  }
};

onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <div>
    <v-list v-if="tasks.length > 0">
      <v-list-item
        v-for="task in tasks"
        :key="task.id"
        style="cursor: pointer"
        @click="goToDetail(task.id)"
      >
        <v-list-item-title>{{ task.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
        <template #append>
          <v-chip
            :color="
              task.priority === 'high'
                ? 'error'
                : task.priority === 'medium'
                  ? 'warning'
                  : 'info'
            "
            size="small"
            class="mr-2"
          >
            {{ task.priority }}
          </v-chip>
          <v-icon
            icon="mdi-delete"
            color="grey"
            @click="openDeleteDialog(task.id, $event)"
          />
        </template>
      </v-list-item>
    </v-list>

    <v-card v-else class="mt-4 pa-4">
      <v-card-text class="text-center">
        <v-icon
          icon="mdi-clipboard-text-outline"
          size="48"
          color="grey"
          class="mb-2"
        />
        <div class="text-h6 text-grey">タスクがありません</div>
        <div class="text-body-2 text-grey-darken-1">
          新しいタスクを作成してみましょう
        </div>
        <v-btn color="primary" class="mt-4" @click="router.push('/create')">
          タスクを作成
        </v-btn>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5"> 確認 </v-card-title>
        <v-card-text> このタスクを削除してよろしいですか？ </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="dialog = false">
            キャンセル
          </v-btn>
          <v-btn color="error" variant="text" @click="handleDelete"> 削除 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <AppSnackbar v-model="snackbar" :text="snackbarMessage" color="success" />
  </div>
</template>
