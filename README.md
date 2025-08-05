# 🚀 WebSite Analytics Automation Platform

Gemini CLIとGoogle Analytics MCPを活用した、Webサイトパフォーマンスの自動分析・改善提案システムです。データドリブンなWebサイト最適化を自動化し、継続的な改善サイクルを実現します。

## 🎯 プロジェクト概要

このプロジェクトは、以下の課題を解決します：
- **手動分析の負担**: Google Analyticsデータの日次チェックと分析
- **改善点の見落とし**: データから具体的な改善アクションの抽出
- **継続的な最適化**: PDCAサイクルの自動化

AIが24/7でWebサイトを監視し、データに基づいた具体的な改善提案を自動生成します。

## 🛠️ 技術スタック

### フロントエンド
- **HTML5** - セマンティックマークアップ
- **CSS3** - レスポンシブデザイン（Flexbox/Grid）
- **JavaScript ES6+** - モダンブラウザ対応
- **Bootstrap 5** - UIフレームワーク

### バックエンド・自動化
- **Node.js** - サーバーサイド処理
- **Express.js** - API サーバー
- **GitHub Actions** - CI/CD・自動化
- **Gemini CLI** - AI 分析エンジン

### 分析・データ
- **Google Analytics 4** - Webサイト分析
- **Google Analytics Reporting API** - データ取得
- **Model Context Protocol (MCP)** - AI ツール連携

### 開発・デプロイ
- **Git/GitHub** - バージョン管理
- **Vercel/Netlify** - ホスティング
- **GitHub Secrets** - 環境変数管理

## 🚀 主な機能

### 📊 自動分析機能
- **日次パフォーマンス分析**: ページビュー、セッション、直帰率の自動測定
- **前期比較**: 前日・前週・前月との比較分析
- **異常値検知**: 設定した閾値を超えた場合のアラート
- **トレンド分析**: 30日間のパフォーマンス傾向

### 💡 AI改善提案
- **具体的な改善案**: 数値に基づく実装可能な提案
- **優先度付け**: ビジネスインパクトと実装コストを考慮
- **A/Bテスト設計**: 改善効果の測定方法も提案
- **ROI予測**: 改善実装による効果予測

### 🤖 GitHub連携
- **自動Issue作成**: 分析結果と改善提案をIssue化
- **コメント対応**: `@gemini` での質問・依頼に自動回答
- **プルリクエスト分析**: コード変更がパフォーマンスに与える影響を予測

### 📈 レポート生成
- **週次レポート**: 包括的なパフォーマンス分析
- **月次ダッシュボード**: KPI達成状況と改善効果
- **カスタムメトリクス**: プロジェクト固有の指標追跡

## 📦 セットアップ手順

### 1. 前提条件
- Node.js 18以上
- Google Analytics 4 プロパティ
- GitHub アカウント
- Gemini API キー

### 2. 基本セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/your-username/analytics-automation.git
cd analytics-automation

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env
# .envファイルを編集してAPIキーを設定
```

### 3. Google Analytics設定

```bash
# Google Cloud プロジェクトの作成
# サービスアカウントの作成
# Analytics APIの有効化
# 認証キーのダウンロード
```

### 4. GitHub Secrets設定

以下のシークレットを設定：
- `GEMINI_API_KEY`: Gemini APIキー
- `GA_PROPERTY_ID`: Google Analytics プロパティID
- `GA_CREDENTIALS`: サービスアカウントJSONキー

### 5. ワークフローの有効化

```yaml
# .github/workflows/ にワークフローファイルが配置済み
# Actions タブで「Run workflow」をクリックして初回実行
```

## 💡 使用方法

### 基本的な使い方

1. **自動実行**: 毎日午前9時に自動で分析実行
2. **手動実行**: GitHub Actions で「Run workflow」
3. **コメント対応**: Issue で `@gemini [質問]` とコメント

### コマンド例

```bash
# Issue コメントでの使用例
@gemini 昨日のパフォーマンスを分析して
@gemini 直帰率が高い理由を調べて
@gemini モバイルとデスクトップのパフォーマンス比較
@gemini SEO改善の提案をして
@gemini A/Bテストの設計をお願いします
```

### カスタマイズ

```javascript
// GEMINI.md でプロジェクト固有の設定
// 分析の閾値、重視する指標、改善の優先順位などを定義
```

## 📋 設定・カスタマイズ

### GEMINI.md 設定例

```markdown
# 分析設定
- 直帰率警告レベル: 70%以上
- 滞在時間警告レベル: 30秒未満
- コンバージョン率低下警告: 20%以上の減少

# 重要指標
1. オーガニック流入数
2. 購入完了率
3. 平均セッション時間
```

### 閾値のカスタマイズ

```javascript
// config/thresholds.js
module.exports = {
  bounceRate: 70,      // 直帰率（%）
  sessionDuration: 30,  // 滞在時間（秒）
  loadSpeed: 3,        // 読み込み速度（秒）
  conversionDrop: 20   // コンバージョン率低下（%）
};
```

## 🤝 貢献方法

### 開発に参加

1. **Fork** このリポジトリ
2. **Feature ブランチ** を作成 (`git checkout -b feature/amazing-feature`)
3. **コミット** 変更内容 (`git commit -m 'Add amazing feature'`)
4. **Push** ブランチ (`git push origin feature/amazing-feature`)
5. **Pull Request** を作成

### バグ報告・機能要望

- **Issues** タブから報告
- **テンプレート** に従って詳細を記載
- **ラベル** を適切に選択

### コーディング規約

- ESLint設定に準拠
- テストカバレッジ80%以上
- コミットメッセージは[Conventional Commits](https://www.conventionalcommits.org/)形式

## 📊 パフォーマンス指標

### 期待される改善効果

- **直帰率**: 5-15%改善
- **滞在時間**: 20-40%向上
- **コンバージョン率**: 10-25%向上
- **ページ読み込み速度**: 1-3秒短縮

### 成功事例

- プロジェクトA: 直帰率 65% → 52%（20%改善）
- プロジェクトB: 平均滞在時間 1分30秒 → 2分15秒（50%向上）

## 🔒 セキュリティ

- **API キー**: GitHub Secrets で安全に管理
- **データ保護**: 個人情報は匿名化処理
- **アクセス制御**: 最小権限の原則を適用
- **監査ログ**: 全ての分析実行を記録

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🙋‍♂️ サポート

### 質問・サポート

- **GitHub Issues**: バグ報告・機能要望
- **GitHub Discussions**: 一般的な質問・議論
- **Wiki**: 詳細なドキュメント

### メンテナンス

- **アクティブサポート**: 平日 9:00-18:00 (JST)
- **緊急対応**: 24時間以内に初回応答
- **定期アップデート**: 月1回のリリース

---

## 🔄 更新履歴

### v1.2.0 (2024-01-15)
- Google Analytics MCP 連携追加
- 週次レポート機能実装
- モバイル分析強化

### v1.1.0 (2024-01-01)
- Gemini CLI Action 対応
- 自動Issue作成機能
- カスタム閾値設定

### v1.0.0 (2023-12-15)
- 初回リリース
- 基本的な分析機能
- GitHub Actions 連携

---

*最終更新: 2024年1月15日*
