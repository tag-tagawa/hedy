■テストプレビュー用と本番公開用で2種類のcssとjsファイルを用意しています。

[scss]
src/scss/style/custom.scss (本番用)
src/scss/style/dev_custom.scss（★テスト プレビュー用）

[js]
src/js/custom.js (本番用)
src/js/dev_custom.js（★テスト プレビュー用）

gulpでコンパイル時に以下のディレクトリに生成

[css]
item/css/common.css (本番用)
item/css/dev_common.css （★テスト プレビュー用）

[js]
item/js/custom.js (本番用)
item/js/dev_custom.js （★テスト プレビュー用）

■本番公開時

各プレビュー用ファイル
dev_common.scss → common.scss
dev_custom.js　→ custom.js

本番公開用のファイルへ差分移植→FTPでファイルUP→テーマの「保存」クリックで反映→反映確認出来たら完了です。