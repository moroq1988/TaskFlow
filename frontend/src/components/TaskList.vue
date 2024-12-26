<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Task } from "../types/task";
import AppSnackbar from "./AppSnackbar.vue";

const router = useRouter();
const tasks = ref<Task[]>([]);
const dialog = ref(false);
const taskToDelete = ref<number | null>(null);
const snackbar = ref(false);
const snackbarMessage = ref("");

const fetchTasks = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/tasks/");
    if (!response.ok) {
      throw new Error("タスクの取得に失敗しました");
    }
    tasks.value = await response.json();
  } catch (error) {
    console.error("エラー:", error);
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
    const response = await fetch(
      `http://localhost:8000/api/tasks/${taskToDelete.value}/`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("タスクの削除に失敗しました");
    }
    await fetchTasks();
    dialog.value = false;
    snackbarMessage.value = "タスクの削除が完了しました";
    snackbar.value = true;
  } catch (error) {
    console.error("エラー:", error);
  }
};

onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <div>
    <v-list>
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

    <!-- 削除確認ダイアログ -->
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

    <!-- スナックバー -->
    <AppSnackbar v-model="snackbar" :text="snackbarMessage" color="success" />
  </div>
</template>
