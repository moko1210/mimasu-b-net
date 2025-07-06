# Claude Code開発指示書

## 1. プロジェクトの背景と目的

株式会社三益商会（ゴム・樹脂製品の専門商社）の新規事業として、中堅製パン会社向けの消耗品受発注プラットフォームの立ち上げを検討しています。

従来のアナログな発注業務（電話・FAX）をデジタル化し、顧客の業務効率化と欠品リスクの低減を実現することを目的としています。

今回は、この事業仮説の有効性を検証するため、**顧客ヒアリングで使用する動くプロトタイプ（MVP）** を開発します。

**依頼者:** 株式会社三益商会の新規事業開発を支援するコンサルタント（トヨタモビリティパーツ株式会社 経営企画）

**重視する点:**
- スピード感（2週間以内で動くものを作る）
- 要件定義に沿ったコア機能の実装
- ヒアリングでデモできる品質
- シンプルで保守しやすいコード

## 2. 開発するプロダクトの概要

- **プロダクト名:** MIMASU B-net (ミマス・ビーネット)
- **概要:** `1_requirements.md` を参照
- **主な機能:**
  - **顧客側:** ログイン、商品検索、カート、発注、発注履歴確認、お気に入り
  - **管理者側:** ログイン、受注管理、商品管理、顧客管理、売上レポート

## 3. 技術スタック（推奨）

プロトタイプ開発に適した、モダンで開発しやすい技術スタックを推奨します：

**推奨構成:**
- **フロントエンド:** React (Next.js 14) + TypeScript
- **バックエンド:** Next.js API Routes（フルスタック構成）
- **データベース:** PostgreSQL（本番想定）またはSQLite（開発簡便性優先）
- **UIフレームワーク:** Tailwind CSS + shadcn/ui
- **認証:** NextAuth.js
- **ORM:** Prisma
- **ホスティング:** Vercel（簡単デプロイのため）

**代替案も歓迎:**
もし、より適していると考える技術スタックがあれば提案してください。

## 4. データベース設計

以下のテーブル設計をベースに、より良い設計があれば改善提案をお願いします：

```sql
-- 顧客企業情報
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  address TEXT,
  phone_number VARCHAR(20),
  contact_person VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 顧客企業の担当者（ログインユーザー）
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user', -- 'user' or 'manager'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 三益商会管理者
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 商品マスタ
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  product_code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  min_stock_level INTEGER DEFAULT 0, -- 在庫アラート用
  image_url VARCHAR(500),
  lead_time_days INTEGER DEFAULT 7, -- 納期日数
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 注文ヘッダ
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL, -- 注文番号
  customer_id INTEGER REFERENCES customers(id),
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'shipped', 'delivered'
  delivery_address TEXT,
  desired_delivery_date DATE,
  notes TEXT,
  ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 注文明細
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

-- お気に入り商品
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);
```

## 5. APIエンドポイント設計

Next.js API Routesを使用した以下のエンドポイントを実装してください：

### 認証API
- `POST /api/auth/login` - 顧客ログイン
- `POST /api/auth/admin/login` - 管理者ログイン
- `POST /api/auth/logout` - ログアウト
- `GET /api/auth/me` - ログイン中ユーザー情報取得

### 商品API（顧客向け）
- `GET /api/products` - 商品一覧取得（検索・フィルター対応）
- `GET /api/products/[id]` - 商品詳細取得
- `GET /api/products/categories` - カテゴリ一覧取得

### 注文API（顧客向け）
- `POST /api/orders` - 新規注文作成
- `GET /api/orders` - 自身の注文履歴取得
- `GET /api/orders/[id]` - 注文詳細取得

### お気に入りAPI
- `GET /api/favorites` - お気に入り商品一覧
- `POST /api/favorites` - お気に入り追加
- `DELETE /api/favorites/[productId]` - お気に入り削除

### 管理API（管理者向け）
- `GET /api/admin/orders` - 全受注一覧取得
- `PUT /api/admin/orders/[id]` - 受注ステータス更新
- `GET /api/admin/products` - 商品マスタ一覧
- `POST /api/admin/products` - 商品新規登録
- `PUT /api/admin/products/[id]` - 商品情報更新
- `DELETE /api/admin/products/[id]` - 商品削除
- `GET /api/admin/customers` - 顧客一覧取得
- `POST /api/admin/customers` - 顧客新規登録
- `GET /api/admin/reports/sales` - 売上レポート取得

## 6. フロントエンド画面設計

以下のページコンポーネントを実装してください：

### 顧客向け画面
- `/login` - ログインページ
- `/` - 商品一覧ページ（検索・フィルター機能付き）
- `/products/[id]` - 商品詳細ページ
- `/cart` - カートページ
- `/orders` - 注文履歴ページ
- `/orders/[id]` - 注文詳細ページ
- `/favorites` - お気に入りページ
- `/profile` - プロフィール・設定ページ

### 管理者向け画面
- `/admin/login` - 管理者ログインページ
- `/admin/dashboard` - ダッシュボード（売上サマリー）
- `/admin/orders` - 受注一覧ページ
- `/admin/orders/[id]` - 受注詳細ページ
- `/admin/products` - 商品マスタ管理ページ
- `/admin/products/new` - 商品新規登録ページ
- `/admin/products/[id]/edit` - 商品編集ページ
- `/admin/customers` - 顧客管理ページ
- `/admin/reports` - レポートページ

### UI/UX要件
- レスポンシブデザイン（デスクトップ中心、タブレット対応）
- 直感的なナビゲーション
- ローディング状態の表示
- エラーハンドリング
- 成功・エラーメッセージの表示

## 7. デモ用サンプルデータ

ヒアリングでのデモ用に、以下のサンプルデータを準備してください：

### 商品データ（15種類程度）

**コンベヤベルト:**
- PUベルト 幅300mm×長さ2000mm（¥25,000）
- PUベルト 幅400mm×長さ2500mm（¥35,000）
- PVCベルト 幅500mm×長さ3000mm（¥45,000）

**プーリー・ローラー:**
- ステンレスプーリー φ200mm（¥15,000）
- アルミローラー φ300mm（¥18,000）
- 樹脂ローラー φ250mm（¥12,000）

**ベアリング:**
- ボールベアリング 6204（¥2,500）
- ローラーベアリング 6304（¥4,500）
- 深溝玉軸受 6206（¥3,200）

**シール・パッキン:**
- Oリング P-50（¥800）
- 角パッキン 20×30mm（¥1,200）
- ウレタンシール 30×40mm（¥1,500）

**その他消耗品:**
- ベルトクリーナー 500ml（¥3,500）
- 食品用潤滑剤 1L（¥5,500）
- 清拭用ウエス 10kg（¥2,800）

### 顧客データ
```
1. 田中パン工場株式会社
   - 担当者：田中太郎（購買課長）
   - Email: tanaka@tanaka-pan.co.jp
   - Password: tanaka123

2. 山田ベーカリー株式会社
   - 担当者：山田花子（工場長）
   - Email: yamada@yamada-bakery.co.jp
   - Password: yamada123

3. 佐藤製パン株式会社
   - 担当者：佐藤次郎（購買担当）
   - Email: sato@sato-bread.co.jp
   - Password: sato123
```

### 管理者データ
```
三益商会営業部
- 担当者：鈴木一郎
- Email: suzuki@mimasu.co.jp
- Password: admin123
```

### 注文履歴データ
過去3ヶ月分の注文データを各顧客に3-5件ずつ作成してください。

## 8. 開発ステップ

以下の順序で開発を進めてください：

### Step 1: プロジェクトセットアップ
1. Next.js + TypeScript プロジェクト作成
2. Prisma セットアップ
3. データベーススキーマ定義
4. 基本的なフォルダ構成

### Step 2: 認証機能
1. NextAuth.js セットアップ
2. ログイン画面（顧客・管理者）
3. セッション管理
4. ログイン後のリダイレクト処理

### Step 3: 商品機能（顧客向け）
1. 商品一覧API
2. 商品検索・フィルター機能
3. 商品詳細API
4. 商品一覧画面・詳細画面

### Step 4: カート・注文機能
1. カート機能（状態管理）
2. 注文作成API
3. 注文履歴API
4. カート画面・注文画面・履歴画面

### Step 5: 管理者機能
1. 受注管理API
2. 商品管理API
3. 顧客管理API
4. 管理者画面各種

### Step 6: デモデータ投入・テスト
1. サンプルデータの投入
2. 動作テスト
3. デモシナリオの確認

## 9. 品質・制約事項

### 品質要件（プロトタイプレベル）
- 主要機能が正常に動作すること
- 基本的なエラーハンドリング
- レスポンシブデザイン対応
- TypeScriptによる型安全性

### 制約事項
- 完璧なコードは不要（プロトタイプのため）
- パフォーマンス最適化は最小限
- 詳細なバリデーションは簡略化可
- セキュリティは基本レベル

### 特に重視したい点
1. **デモのしやすさ** - ヒアリング時にスムーズに操作説明できること
2. **リアリティ** - 実際の業務フローに近い画面遷移
3. **拡張性** - 将来的な機能追加を考慮した設計

## 10. 完成時の成果物

- **ソースコード一式**
- **README.md**（セットアップ手順）
- **デプロイ手順書**
- **デモ操作手順書**

## 11. 開発中の質問・提案について

- 不明な点や、より良い提案があれば積極的に質問・提案してください
- 特にUI/UXについては、ユーザビリティ向上の提案を歓迎します
- 製パン業界特有の業務フローで不明な点があれば確認してください