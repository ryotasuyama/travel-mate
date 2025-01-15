# トラベルメイト

AIを活用した旅行計画支援アプリケーション。ユーザーの希望に基づいて最適な旅行プランを提案します。

## 機能

- 旅行プランの自動生成
  - 出発地・目的地の指定
  - 人数・日程の設定
  - 予算に応じたプラン作成
  - 交通手段の考慮
- 詳細なスケジュール提案
  - 観光スポットの提案
  - タイムラインの作成
  - 食事プランの提案

## 技術スタック

- フロントエンド
  - Next.js 14
  - TypeScript
  - Tailwind CSS
- API
  - Anthropic Claude API
  - Next.js API Routes
- デプロイ
  - Vercel

## 開発環境のセットアップ

1. リポジトリのクローン
```bash
git clone [リポジトリURL]
cd travel-mate
```

2. 依存パッケージのインストール
```bash
npm install
```

3. 環境変数の設定
`.env.local`ファイルを作成し、必要な環境変数を設定：
```
ANTHROPIC_API_KEY=your_api_key_here
```

4. 開発サーバーの起動
```bash
npm run dev
```

アプリケーションは http://localhost:3000 で実行されます。

## 環境変数

| 変数名 | 説明 | 必須 |
|---|---|---|
| ANTHROPIC_API_KEY | Anthropic APIのキー | ○ |

## デプロイ

このアプリケーションはVercelへのデプロイを想定しています。

1. GitHubリポジトリの作成
2. Vercelでプロジェクトをインポート
3. 環境変数の設定
4. デプロイの実行
