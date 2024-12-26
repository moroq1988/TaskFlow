<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const showLogoutDialog = ref(false);

const handleLogout = () => {
  showLogoutDialog.value = false;
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <v-app-bar color="white">
    <v-container class="d-flex px-0">
      <v-app-bar-title class="d-flex align-center">
        <span
          class="text-h5 font-weight-black"
          :style="{
            background: 'linear-gradient(45deg, #1867c0, #5cbbf6)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          }"
          >TaskFlow</span
        >
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <!-- 認証済みの場合のみ表示するボタン群 -->
      <template v-if="authStore.isAuthenticated">
        <v-btn class="font-weight-bold" @click="router.push('/create')"
          >タスク作成</v-btn
        >
        <v-btn class="ml-2 font-weight-bold" @click="router.push('/tasks')"
          >タスク一覧</v-btn
        >
        <v-btn
          variant="flat"
          color="grey-darken-1"
          class="ml-2 font-weight-bold"
          @click="showLogoutDialog = true"
        >
          ログアウト
        </v-btn>
      </template>
    </v-container>

    <!-- ログアウト確認ダイアログ -->
    <v-dialog v-model="showLogoutDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5"> ログアウトの確認 </v-card-title>
        <v-card-text> ログアウトしてもよろしいですか？ </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="showLogoutDialog = false">
            キャンセル
          </v-btn>
          <v-btn color="error" variant="text" @click="handleLogout">
            ログアウト
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>
