# Notion データベース セットアップガイド

このガイドでは、komalogで使用するNotionデータベースのセットアップ方法を説明します。

## ステップ 1: Notionデータベースの作成

1. Notionを開く
2. 新しいページを作成
3. 「データベース」→「フルページ」を選択
4. ページタイトルを「Blog Posts」などに設定

## ステップ 2: プロパティの設定

以下のプロパティを追加してください：

### 必須プロパティ

| プロパティ名 | タイプ | 説明 |
|------------|--------|------|
| Title (名前) | タイトル | 記事のタイトル（デフォルトで存在） |
| Category | セレクト | 記事のカテゴリ（1つ選択） |
| Tags | マルチセレクト | 記事のタグ（複数選択可） |
| Published Date | 日付 | 公開日 |

### プロパティ追加方法

1. データベースの右上の「+」ボタンをクリック
2. 各プロパティを追加：

**Category (セレクト)**
- プロパティ名: `Category`
- タイプ: セレクト
- オプション例: Technology, Lifestyle, Programming, Design など

**Tags (マルチセレクト)**
- プロパティ名: `Tags`
- タイプ: マルチセレクト
- オプション例: JavaScript, React, Next.js, TypeScript, CSS など

**Published Date (日付)**
- プロパティ名: `Published Date`
- タイプ: 日付

## ステップ 3: Notion APIインテグレーションの作成

1. [Notion Developers](https://www.notion.so/my-integrations) にアクセス
2. 「+ 新しいインテグレーション」をクリック
3. 以下を設定：
   - **名前**: komalog (または任意の名前)
   - **ワークスペース**: 使用するワークスペースを選択
   - **種類**: Internal Integration
4. 「送信」をクリック
5. 表示される **Internal Integration Token** をコピーして安全に保管

## ステップ 4: データベースへのアクセス権限付与

1. 作成したNotionデータベースページを開く
2. 右上の「...」メニューをクリック
3. 「接続」→ 作成したインテグレーション（komalog）を選択
4. 「確認」をクリック

## ステップ 5: データベースIDの取得

データベースのURLから取得します：

```
https://www.notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                    この部分がDatabase ID
```

URLの`?v=`より前の32文字の英数字がDatabase IDです。

## ステップ 6: 環境変数の設定

Next.jsプロジェクトの`.env.local`ファイルに以下を追加：

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- `NOTION_API_KEY`: ステップ3で取得したIntegration Token
- `NOTION_DATABASE_ID`: ステップ5で取得したDatabase ID

## ステップ 7: テストデータの追加

データベースに1〜2件のテスト記事を追加して動作確認します：

**例: テスト記事**
- **Title**: "はじめてのブログ記事"
- **Category**: "Technology"
- **Tags**: "Next.js", "TypeScript"
- **Published Date**: 今日の日付
- **本文**: ページ内に自由にコンテンツを追加

## 注意事項

⚠️ **セキュリティ**
- `.env.local` ファイルは絶対にGitにコミットしないでください
- Integration Tokenは他人と共有しないでください

✅ **確認ポイント**
- データベースにインテグレーションのアクセス権限が付与されている
- 環境変数が正しく設定されている
- テストデータが追加されている

---

セットアップが完了したら、Next.jsアプリケーションから Notion APIを通じてデータを取得できます。
