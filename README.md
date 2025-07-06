# MIMASU B-net (ミマス・ビーネット)

製パン会社向け消耗品受発注プラットフォーム

## 概要

中堅製パン会社の「面倒な消耗品発注」を「簡単・確実」に変える、三益商会専用のBtoB受発注プラットフォーム

## 技術スタック

- **フロントエンド:** Next.js 14 (App Router) + TypeScript
- **スタイリング:** Tailwind CSS
- **データベース:** SQLite (開発) / PostgreSQL (本番)
- **ORM:** Prisma
- **認証:** NextAuth.js
- **状態管理:** TanStack Query

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env`を作成し、必要な値を設定してください。

```bash
cp .env.example .env
```

### 3. データベースのセットアップ

```bash
# データベースマイグレーションの実行
npx prisma migrate dev

# Prismaクライアントの生成
npx prisma generate
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

## 主な機能

### 顧客側機能
- 商品検索・一覧表示
- カート機能
- 発注・発注履歴確認
- お気に入り機能

### 管理者側機能
- 受注管理
- 商品マスタ管理
- 顧客管理
- 売上レポート

## プロジェクト構成

```
mimasu-bnet/
├── app/                # Next.js App Router
├── components/         # Reactコンポーネント
│   └── ui/            # UIコンポーネント
├── lib/               # ユーティリティ関数
├── prisma/            # Prismaスキーマ・マイグレーション
├── public/            # 静的ファイル
├── types/             # TypeScript型定義
└── utils/             # ヘルパー関数
```

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# Lint実行
npm run lint

# Prisma Studio起動（データベースGUI）
npx prisma studio
```

## デモデータ

初回セットアップ時にデモ用のサンプルデータを投入するには：

```bash
npm run seed
```

## トラブルシューティング

### データベース接続エラー
- `.env`ファイルの`DATABASE_URL`が正しく設定されているか確認
- `npx prisma generate`を実行してPrismaクライアントを再生成

### ビルドエラー
- `node_modules`を削除して`npm install`を再実行
- TypeScriptのエラーがないか確認