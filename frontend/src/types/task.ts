interface Task {
  id: number;
  /** タスクのタイトル（必須） */
  title: string;
  /** 詳細な説明（任意） */
  description: string;
  /** 期限日 */
  dueDate: string;
  /** 優先度 */
  priority: "low" | "medium" | "high";
  /** 状態 */
  status: "todo" | "in_progress" | "done";
  /** タグ（カテゴリ分け用） */
  tags: string[];
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}
