<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = "";

    const response = await axios.post("http://localhost:8000/api/accounts/login/", {
      username: username.value,
      password: password.value,
    });

    authStore.login(response.data.tokens);

    router.push("/tasks");
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      error.value = e.response?.data?.error || "ログインに失敗しました";
    } else {
      error.value = "予期せぬエラーが発生しました";
    }
    console.error("Login error:", e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-h5 text-center pt-6">ログイン</v-card-title>
          <v-form class="pa-4" @submit.prevent="handleLogin">
            <v-text-field
              v-model="username"
              label="ユーザー名"
              prepend-icon="mdi-account"
              required
            />
            <v-text-field
              v-model="password"
              label="パスワード"
              :type="'password'"
              prepend-icon="mdi-lock"
              required
            />
            <v-btn color="primary" type="submit" block class="mt-4">
              ログイン
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-alert v-if="error" type="error" class="mb-4">
    {{ error }}
  </v-alert>
</template>
