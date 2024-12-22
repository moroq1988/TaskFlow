<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import TaskForm from "./components/TaskForm.vue";
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container>
        <v-card class="mx-auto mt-4">
          <v-card-title>新規タスク</v-card-title>
          <v-card-text>
            <TaskForm />
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
