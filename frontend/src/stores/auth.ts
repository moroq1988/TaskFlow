import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!localStorage.getItem("access_token"));
  const token = ref(localStorage.getItem("access_token") || "");

  const login = (tokens: { access: string; refresh: string }) => {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
    isAuthenticated.value = true;
    token.value = tokens.access;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    isAuthenticated.value = false;
    token.value = "";
  };

  return {
    isAuthenticated,
    token,
    login,
    logout,
  };
});
