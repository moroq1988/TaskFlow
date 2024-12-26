import { createRouter, createWebHistory } from "vue-router";
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";
import TaskDetail from "../components/TaskDetail.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "root",
      component: LoginView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/create",
      name: "create",
      component: TaskForm,
    },
    {
      path: "/tasks",
      name: "list",
      component: TaskList,
    },
    {
      path: "/tasks/:id",
      name: "detail",
      component: TaskDetail,
    },
  ],
});

export default router;
