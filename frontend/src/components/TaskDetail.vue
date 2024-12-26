<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Task } from "../types/task";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const task = ref<Task | null>(null);

const fetchTask = async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/tasks/${route.params.id}/`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        console.error("認証エラー");
        return;
      }
      throw new Error("タスクの取得に失敗しました");
    }

    task.value = await response.json();
  } catch (error) {
    console.error("エラー:", error);
  }
};

onMounted(() => {
  fetchTask();
});
</script>

<template>
  <div v-if="task">
    <v-card>
      <v-card-title class="d-flex align-center">
        <span>{{ task.title }}</span>
        <v-chip
          class="ml-4"
          :color="
            task.priority === 'high'
              ? 'error'
              : task.priority === 'medium'
                ? 'warning'
                : 'info'
          "
          size="small"
        >
          {{ task.priority }}
        </v-chip>
      </v-card-title>

      <v-card-text>
        <p class="text-body-1">{{ task.description }}</p>
        <v-chip class="mt-4" :color="task.status === 'done' ? 'success' : 'primary'">
          {{ task.status }}
        </v-chip>
        <div v-if="task.dueDate" class="mt-4">
          <strong>期限：</strong> {{ task.dueDate }}
        </div>
        <div v-if="task.tags && task.tags.length > 0" class="mt-4">
          <strong>タグ：</strong>
          <v-chip v-for="tag in task.tags" :key="tag" class="ml-2" size="small">
            {{ tag }}
          </v-chip>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="router.push('/tasks')"> 一覧に戻る </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <div v-else>
    <v-progress-circular indeterminate></v-progress-circular>
  </div>
</template>
