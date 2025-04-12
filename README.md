# agree-screen

IoT 部への入部同意サイト

## 各ディレクトリ/ファイルの詳細

### `/css`

- **animations.css:** ローディングスピナーなどのアニメーションに関するスタイルを定義します。
- **base.css:** 全体的なスタイルのリセット、body のスタイル、汎用クラス（`text-center`, `text-green`など）を定義します。
- **components.css:** カードの裏表、ローディングオーバーレイ、ボタンなど、再利用可能な UI コンポーネントのスタイルを定義します。
- **forms.css:** 入力フォームに関するスタイルを定義します。 特に、規約のスクロール領域や同意ボタンのスタイルを含みます。
- **index.css:** 他の CSS ファイルをまとめてインポートするエントリポイントです。
- **layout.css:** サイトのレイアウトに関するスタイルを定義します。 カードの回転アニメーションや、画面サイズに応じたレイアウト調整が含まれます。

### `/html`

- **index.html:** Web ページの構造を定義します。
  - カード形式の UI で、初期状態ではログインボタンと規約確認ボタンが表示されます。
  - 規約確認ボタンを押すと、カードが反転し、規約が表示されます。
  - ローディングオーバーレイを表示するための要素が含まれます。

### `/js`

- **fetch-agree-data.js:**

  - `fetchAgreeData`関数は、バックエンドから規約データを取得し、HTML にレンダリングします。
  - 取得中はローディング表示を行い、エラーが発生した場合はエラーメッセージを表示します。
  - 名前とクラスの入力フォームを動的に追加します。

- **form-validation.js:**

  - `appendNameClassForm`関数は、名前とクラスの入力フォームを追加し、入力内容と規約のスクロール状態に基づいて同意ボタンの有効/無効を切り替えます。

- **index.js:**

  - `DOMContentLoaded`イベントをリッスンし、`setupUI`関数を実行します。
  - アプリケーションのエントリーポイントです。

- **post-student-info.js:**

  - `postStudentInfo`関数は、学生の名前とクラスをバックエンドに送信します。
  - API リクエストが失敗した場合はエラーをスローします。

- **render-block.js:**

  - `renderBlocks`関数は、Notion API から取得した規約データを HTML にレンダリングします。
  - リスト、段落などのブロックタイプに応じて適切な HTML 要素を生成します。

- **ui-handlers.js:**
  - `setupUI`関数は、UI 要素（ボタン、カードなど）にイベントリスナーを設定します。
  - 規約確認ボタンのクリックでカードを反転させ、規約データを取得します。
  - 同意ボタンのクリックで学生情報を送信し、成功メッセージを表示します。

## 動作フロー

1. `index.html`が読み込まれ、`index.js`が実行されます。
2. `index.js`から`ui-handlers.js`の`setupUI`関数が呼び出され、UI 要素にイベントリスナーが設定されます。
3. 「規約を確認する」ボタンがクリックされると、`fetch-agree-data.js`の`fetchAgreeData`関数が呼び出され、規約データが取得・表示されます。
4. 規約を最後までスクロールし、名前とクラスを入力すると、「確認して同意する」ボタンが有効になります。
5. 「確認して同意する」ボタンがクリックされると、`post-student-info.js`の`postStudentInfo`関数が呼び出され、学生情報が送信されます。
6. 成功すると、カードが反転し、成功メッセージが表示されます。

## 開発環境

- **バックエンド:** `http://localhost:3000` で動作する Express の API サーバーでテストしています。
  - `cd mock-server && pnpm i && pnpm dev` で起動します。
  - 実際にデータ取得を試す場合は以下の手順を行ってください。
  - `https://www.notion.so/profile/integrations` からトークンを用意
  - Notionの使用するテーブルのdatabase_idを用意
  - envを作成して `.env.sample` のように記述
- **フロントエンド:** ブラウザで`index.html`を開いて確認します。

## 補足

- このアプリケーションは、ローカル環境での開発を想定しています。
- バックエンド API のエンドポイント（`http://localhost:3000/notion`, `http://localhost:3000/add`）は、必要に応じて変更してください。
