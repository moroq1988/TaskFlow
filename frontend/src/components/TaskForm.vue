<script setup lang="ts">
import { ref } from "vue";
import AppSnackbar from "./AppSnackbar.vue";
import type { Task } from "../types/task";
import type { VForm } from "vuetify/components";
import apiClient from "@/api/client";
import axios from "axios";

const title = ref<Task["title"]>("");
const description = ref<Task["description"]>("");
const dueDate = ref<Task["dueDate"]>("");
const priority = ref<Task["priority"]>("medium");
const tags = ref<Task["tags"]>([]);

const priorities = [
  { value: "low", label: "低", color: "info" },
  { value: "medium", label: "中", color: "warning" },
  { value: "high", label: "高", color: "error" },
];

const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("");
const form = ref<VForm | null>(null);

/** タスクを作成する */
const createTask = async () => {
  try {
    await apiClient.post("/tasks/", {
      title: title.value,
      description: description.value,
      due_date: dueDate.value,
      priority: priority.value,
      tags: tags.value,
      status: "todo" as Task["status"],
    });

    // フォームとバリデーションをリセット
    form.value?.reset();
    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "medium";
    tags.value = [];

    snackbarText.value = "タスクが作成されました";
    snackbarColor.value = "success";
    snackbar.value = true;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      snackbarText.value = e.response?.data?.error || "エラーが発生しました";
    } else {
      snackbarText.value = "予期せぬエラーが発生しました";
    }
    snackbarColor.value = "error";
    snackbar.value = true;
    console.error("タスク作成エラー:", e);
  }
};
</script>

<template>
  <v-form ref="form" @submit.prevent="createTask">
    <v-text-field
      v-model="title"
      label="タスク名"
      required
      :rules="[(v) => !!v || 'タスク名は必須です']"
    />

    <v-textarea v-model="description" label="詳細" rows="3" />

    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="dueDate"
          label="期限日"
          type="date"
          prepend-icon="mdi-calendar"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="priority"
          :items="priorities"
          label="優先度"
          item-title="label"
          item-value="value"
        />
      </v-col>
    </v-row>

    <v-combobox v-model="tags" label="タグ" multiple chips small-chips />

    <v-btn color="primary" block class="mt-4" type="submit">タスクを追加</v-btn>
  </v-form>

  <AppSnackbar v-model="snackbar" :text="snackbarText" :color="snackbarColor" />
</template>
