<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container>
        <v-card class="mx-auto mt-4">
          <v-card-text>
            <router-view></router-view>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
