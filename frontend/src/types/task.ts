export interface Task {
  /** タスクのタイトル */
  title: string;
  /** 詳細な説明 */
  description?: string;
  /** 期限日（任意） */
  dueDate?: string;
  /** 優先度 */
  priority: "low" | "medium" | "high";
  /** 状態 */
  status: "todo" | "in_progress" | "done";
  /** タグ（カテゴリ分け用、任意） */
  tags?: string[];
}
