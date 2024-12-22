<script setup lang="ts">
import { ref } from "vue";
import type { Task } from "../types/task";

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

/** タスクを作成する */
const createTask = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        dueDate: dueDate.value,
        priority: priority.value,
        tags: tags.value,
        status: "todo" as Task["status"],
      }),
    });

    if (!response.ok) {
      throw new Error("タスクの作成に失敗しました");
    }

    // フォームをリセット
    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "medium";
    tags.value = [];

    // 成功メッセージを表示（後でVuetifyのスナックバーなどで実装）
    console.log("タスクが作成されました");
  } catch (error) {
    console.error("エラー:", error);
    // エラーメッセージを表示（後でVuetifyのスナックバーなどで実装）
  }
};
</script>

<template>
  <v-form @submit.prevent="createTask">
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

    <v-btn color="primary" block class="mt-4" type="submit"> タスクを追加 </v-btn>
  </v-form>
</template>
