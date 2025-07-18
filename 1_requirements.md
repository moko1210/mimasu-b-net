# 製パン会社向け消耗品受発注プラットフォーム プロダクト要件定義書

## 1. プロダクト概要

- **プロダクト名（仮称）:** MIMASU B-net (ミマス・ビーネット)
- **コンセプト:** 中堅製パン会社の「面倒な消耗品発注」を「簡単・確実」に変える、三益商会専用のBtoB受発注プラットフォーム
- **目的:**
  - プロトタイプを用いてターゲット顧客にヒアリングを実施し、課題解決の有効性を検証する（仮説検証）
  - 顧客のDX化を支援し、関係性を強化するとともに、三益商会の業務効率化と新たな収益機会を創出する

## 2. 事業背景・仮説

**市場状況:**
- 大手製パン会社は既に大手ベルトメーカーの受発注システムを導入済み
- 中堅規模（売上100億～300億）は、同業態の商社が参入を開始している状況
- 三益商会としても市場参入の機会を逃したくない

**検証したい仮説:**
中堅製パン会社において、従来のアナログな発注プロセス（電話・FAX）をデジタル化することで、発注ミスの削減・業務効率化・欠品リスク低減という価値を提供できる

## 3. ターゲットユーザー

| ユーザー種別 | 所属/役職 | 主な利用シーン | 重要度 |
|:---|:---|:---|:---|
| **メインターゲット** | 中堅製パン会社（売上100億～300億規模）の**購買担当者** | 日常的な消耗品（コンベヤベルト等）の発注、在庫確認、発注履歴の管理 | 最重要 |
| **サブターゲット** | 同社の**工場長・現場責任者** | 現場の在庫状況の確認、緊急時の発注、購買担当者への発注承認・依頼 | 重要 |
| **管理者** | 株式会社三益商会の**営業担当者** | 顧客からの受注確認、商品マスタの管理、顧客情報の管理 | 重要 |

## 4. ユーザーの課題と解決策

| ユーザーの課題 (As-Is) | 本プロダクトによる解決策 (To-Be) | 検証ポイント |
|:---|:---|:---|
| 電話やFAXでの発注は時間がかかり、聞き間違いや書き間違いなどの**人的ミス**が起こりやすい | **オンラインで24時間いつでも発注可能**。発注内容はデータで記録されるため、人的ミスを撲滅 | 現在のミス発生頻度と影響度 |
| 担当者ごとにバラバラな方法・タイミングで発注するため、**会社全体の発注状況が把握しづらい** | **発注履歴をシステムで一元管理**。いつ、誰が、何を、いくつ発注したかが一覧で可視化される | 発注業務の標準化ニーズ |
| 在庫を目視で確認しており、発注漏れによる**欠品で生産ラインが停止するリスク**を常に抱えている | **在庫状況をシステムで可視化**。定期的な確認を促し、将来的にはアラート機能で発注漏れを防止 | 欠品による損失の実態 |
| 最適な在庫量や発注タイミングの判断が担当者の経験則に依存している | **発注履歴データに基づき、発注業務を標準化**。将来的にはAIによる需要予測や最適発注提案も視野 | データドリブンな発注への関心度 |

## 5. プロトタイプの主要機能（スコープ）

プロトタイプでは、ユーザーのコアな課題である「発注業務のデジタル化」を検証するため、以下の機能に絞って開発します。

### 【顧客側（製パン会社）機能】

| 機能名 | 機能概要 | 優先度 |
|:---|:---|:---|
| **ログイン機能** | ID/パスワードでログイン。顧客ごとに表示する商品や価格を制御 | 必須 |
| **商品一覧/検索機能** | 三益商会が提供する商品（コンベヤベルト等）を画像付きで一覧表示。商品名や型番でのキーワード検索、カテゴリでの絞り込みが可能 | 必須 |
| **商品詳細機能** | 商品の規格、価格、在庫状況（◎在庫あり/△残りわずか/✕在庫なし）、納期目安などを確認 | 必須 |
| **カート機能** | 必要な商品をカートに入れ、数量を変更。複数商品の一括発注が可能 | 必須 |
| **発注確定機能** | カート内の商品を発注。納品先、希望納期、備考を入力可能 | 必須 |
| **発注履歴確認機能** | 過去の発注履歴（発注日、商品、数量、金額、ステータス）を一覧で確認。再注文機能付き | 必須 |
| **お気に入り機能** | よく発注する商品をお気に入り登録し、ワンクリックで発注 | 推奨 |

### 【管理者側（三益商会）機能】

| 機能名 | 機能概要 | 優先度 |
|:---|:---|:---|
| **ログイン機能** | 管理者用のID/パスワードでログイン | 必須 |
| **受注一覧/詳細機能** | 顧客からの注文を一覧で確認。注文内容の詳細やステータス（受注済/発送準備中/発送済）を管理・更新 | 必須 |
| **商品マスタ管理機能** | 取り扱い商品を登録・編集・削除（商品名、型番、価格、画像、在庫数など） | 必須 |
| **顧客管理機能** | 取引先企業の情報（会社名、担当者、ログインID）を登録・管理 | 必須 |
| **売上レポート機能** | 期間別・顧客別・商品別の受注実績をグラフで可視化 | 推奨 |

## 6. 非機能要件（プロトタイプ）

- **対応デバイス:** PCのWebブラウザ（Google Chrome最新版を推奨）。将来的にはスマートフォン対応も検討
- **UI/UX:** 専門知識がなくても直感的に操作できる、シンプルで分かりやすい画面デザイン
- **セキュリティ:** 基本的な認証機能とHTTPS通信（プロトタイプレベル）
- **パフォーマンス:** レスポンス時間は3秒以内（プロトタイプレベル）

## 7. 成功指標（プロトタイプ検証）

**定性指標:**
- ターゲット顧客からの「これなら使いたい」という反応
- 現在の発注プロセスの課題に対する解決策としての評価
- UIの直感性・使いやすさに対する評価

**定量指標:**
- ヒアリング対象5社中3社以上からのポジティブフィードバック
- デモ操作での主要機能（商品検索→カート追加→発注）の完了率80%以上

## 8. デモシナリオ（ヒアリング用）

### 顧客向けデモフロー
1. **ログイン:** 「田中パン工場の購買担当者」としてログイン
2. **商品検索:** 「コンベヤベルト」で検索
3. **商品選択:** 幅400mmのベルトを選択、詳細確認
4. **カート追加:** 数量2本をカートに追加
5. **発注手続き:** 納品先・希望納期を入力して発注
6. **履歴確認:** 発注履歴画面で過去の注文を確認

### 管理者向けデモフロー
1. **受注確認:** 新しい注文をチェック
2. **ステータス更新:** 「発送準備中」に変更
3. **商品管理:** 新商品の登録
4. **売上確認:** 月次売上レポートの表示

## 9. 製パン業界特有の考慮事項

### 取り扱い商品例
- **コンベヤベルト:** 幅300mm、400mm、500mm（材質：PU、PVC等）
- **プーリー・ローラー:** 直径200mm、300mm（材質：ステンレス、アルミ等）
- **ベアリング:** 各種サイズ（6200番台、6300番台等）
- **シール材・パッキン:** Oリング、角パッキン等
- **その他消耗品:** ベルトクリーナー、潤滑剤等

### 価格帯
- 小物部品：1,000円～10,000円
- ベルト・ローラー：10,000円～100,000円
- 大型部品：50,000円～300,000円

### 発注パターン
- **定期発注:** 月1回の定期メンテナンス用
- **緊急発注:** 故障時の緊急交換用
- **まとめ発注:** 年度予算消化時期の大量発注

### 納期要件
- **通常品:** 1週間以内
- **特注品:** 2-4週間
- **緊急対応:** 当日～翌日（在庫品のみ）