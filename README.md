<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

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
