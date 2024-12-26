<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <v-app-bar color="primary">
    <v-container class="d-flex px-0">
      <v-app-bar-title class="d-flex align-center">
        <span style="cursor: pointer" @click="router.push('/')">TaskFlow</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn @click="router.push('/')">タスク作成</v-btn>
      <v-btn class="ml-2" @click="router.push('/tasks')">タスク一覧</v-btn>
    </v-container>
  </v-app-bar>
</template>
