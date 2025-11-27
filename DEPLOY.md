# Vercel へのデプロイガイド

このガイドでは、komalogをVercelにデプロイする手順を説明します。

## 前提条件

- ✅ Notionデータベースのセットアップ完了（[NOTION_SETUP.md](./NOTION_SETUP.md)参照）
- ✅ GitHub アカウント
- ✅ Vercel アカウント（[vercel.com](https://vercel.com)で無料作成可能）

## ステップ 1: GitHubリポジトリの作成

1. [GitHub](https://github.com)にログイン
2. 新しいリポジトリを作成
3. ローカルのコードをプッシュ:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/komalog.git
git push -u origin main
```

## ステップ 2: Vercelにデプロイ

### 方法1: Vercel Dashboard（推奨）

1. [Vercel](https://vercel.com)にログイン
2. 「Add New...」→「Project」をクリック
3. GitHubリポジトリをインポート
4. プロジェクト設定:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (デフォルト)
   - **Build Command**: `npm run build` (自動設定)
   - **Output Directory**: `.next` (自動設定)

5. 環境変数の設定:

| 変数名 | 値 | 必須 |
|--------|-----|------|
| `NOTION_API_KEY` | Notion Integration Token | ✅ 必須 |
| `NOTION_DATABASE_ID` | NotionデータベースID | ✅ 必須 |
| `NEXT_PUBLIC_SITE_URL` | https://your-domain.vercel.app | 推奨 |

6. 「Deploy」をクリック

### 方法2: Vercel CLI

```bash
# Vercel CLI のインストール
npm i -g vercel

# デプロイ
vercel

# 本番環境にデプロイ
vercel --prod
```

## ステップ 3: 環境変数の設定（CLI経由）

```bash
vercel env add NOTION_API_KEY
vercel env add NOTION_DATABASE_ID
vercel env add NEXT_PUBLIC_SITE_URL
```

## ステップ 4: オプション機能の設定

### Giscus コメント機能（オプション）

1. GitHubでパブリックリポジトリを作成
2. リポジトリの設定でDiscussionsを有効化
3. [Giscus app](https://github.com/apps/giscus)をインストール
4. [giscus.app](https://giscus.app)で設定を取得
5. Vercelに以下の環境変数を追加:

```
NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id
```

### カスタムドメインの設定

1. Vercel Project Settings → Domains
2. カスタムドメインを追加
3. DNS設定を更新（Vercelが指示を表示）
4. `NEXT_PUBLIC_SITE_URL`をカスタムドメインに更新

## ステップ 5: デプロイ後の確認

✅ チェックリスト:
- [ ] サイトが正常に表示される
- [ ] Notionから記事が取得できる
- [ ] ダークモード切り替えが動作する
- [ ] カテゴリ・タグページが表示される
- [ ] SNSシェアボタンが動作する
- [ ] RSSフィード (`/feed`) が生成される
- [ ] Vercel Analyticsが有効（Vercel Dashboard確認）

## トラブルシューティング

### ビルドエラー

**問題**: 環境変数が見つからない

```
Error: NOTION_API_KEY is required
```

**解決**: Vercel Project Settings → Environment Variables で環境変数を追加

### Notion API エラー

**問題**: 記事が表示されない

**確認事項**:
1. Notion Integration に正しい権限があるか
2. データベースにIntegrationのアクセス権が付与されているか
3. データベースIDが正しいか

### ISR（Incremental Static Regeneration）

デフォルトで1時間ごとに記事を再検証します。
即座に更新を反映したい場合:

```bash
# Vercel CLI でデプロイ
vercel --prod

# または On-Demand Revalidation を実装
```

## 継続的デプロイ

Vercelは自動的にGitHubと連携し、以下を実行します:

- **main ブランチ**: 本番環境に自動デプロイ
- **他のブランチ**: プレビューデプロイを作成
- **Pull Request**: プレビューURLを自動生成

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Analytics](https://vercel.com/analytics)

---

デプロイが完了したら、Notionでブログ記事を書いて公開しましょう！
