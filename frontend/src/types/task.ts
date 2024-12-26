export interface Task {
  /** タスクのID */
  id: number;
  /** タスクのタイトル */
  title: string;
  /** 詳細な説明 */
  description?: string;
  /** 期限日 */
  dueDate?: string;
  /** 優先度 */
  priority: "low" | "medium" | "high";
  /** 状態 */
  status: "todo" | "in_progress" | "done";
  /** タグ（カテゴリ分け用） */
  tags?: string[];
}
