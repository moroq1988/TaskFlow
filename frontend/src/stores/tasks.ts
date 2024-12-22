import { defineStore } from "pinia"

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  dueDate: string
}

interface TaskState {
  tasks: Task[]
  filter: "all" | "active" | "completed"
  sortBy: "dueDate" | "title" | "status"
}

export const useTaskStore = defineStore("tasks", {
  state: (): TaskState => ({
    tasks: [],
    filter: "all",
    sortBy: "dueDate",
  }),

  actions: {
    async fetchTasks() {
      // タスク一覧取得
    },
    async addTask(task: Omit<Task, "id">) {
      // タスク追加
    },
    // その他のアクション
  },
})
