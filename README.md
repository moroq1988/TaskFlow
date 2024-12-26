# TaskFlow

## 機能

- ユーザー認証（ログイン/ログアウト）
- タスクの作成、表示、削除
- タスクの優先度と期限の管理
- タグによるタスク分類

## 技術スタック

### フロントエンド

- Vue.js 3 (Composition API)
- Vuetify 3
- TypeScript
- Pinia (状態管理)

### バックエンド

- Django 4
- Django REST Framework
- SQLite3

## 開発環境のセットアップ

### 必要条件

- Docker
- Docker Compose

### 起動手順

1. リポジトリのクローン

   git clone https://github.com/moroq1988/TaskFlow.git

   cd TaskFlow

2. コンテナの構築と起動

   docker compose up -d --build

3. データベースのマイグレーション

   docker compose exec backend python manage.py migrate

4. アプリケーションへのアクセス

- フロントエンド: http://localhost:5173
- バックエンド: http://localhost:8000

## ログインユーザー情報

- Username: testuser
- Password: testpass123
