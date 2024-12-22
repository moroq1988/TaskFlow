<script setup lang="ts">
import { ref } from "vue";

const title = ref("");
const description = ref("");
const dueDate = ref("");
const priority = ref("medium");
const tags = ref<string[]>([]);

const priorities = [
  { value: "low", label: "低", color: "info" },
  { value: "medium", label: "中", color: "warning" },
  { value: "high", label: "高", color: "error" },
];
</script>

<template>
  <v-form @submit.prevent>
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
