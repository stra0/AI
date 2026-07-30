<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIソースコード検出・評価システム</title>
    <style>
        body { font-family: sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; background-color: #f7f9fa; color: #333; }
        h1 { border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        .container { display: flex; flex-direction: column; gap: 15px; }
        textarea { width: 100%; height: 300px; font-family: monospace; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        button { padding: 12px; font-size: 16px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
        button:hover { background-color: #0056b3; }
        .result-box { margin-top: 20px; padding: 20px; background: white; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); display: none; }
        .score-display { font-size: 24px; font-weight: bold; margin-bottom: 15px; }
        .detail-list { line-height: 1.6; }
        .ai-high { color: #dc3545; }
        .human-high { color: #28a745; }
    </style>
</head>
<body>

    <h1>AIコード特徴・評価アナライザー</h1>
    <p>検証したいJavaScriptまたは主要なロジックコードを貼り付けて「解析実行」を押してください。</p>

    <div class="container">
        <textarea id="codeInput" placeholder="// ここに解析したいコードを貼り付けてください..."></textarea>
        <button id="analyzeBtn">ソースコードを解析・比較する</button>
    </div>

    <div id="resultBox" class="result-box">
        <div id="scoreDisplay" class="score-display"></div>
        <div id="detailList" class="detail-list"></div>
    </div>

    <!-- ES6 Modulesとして各クラスファイルを安全にインポート -->
    <script type="module">
        import { CodeAnalyzer } from './CodeAnalyzer.js';

        document.getElementById('analyzeBtn').addEventListener('click', () => {
            const code = document.getElementById('codeInput').value.trim();
            if (!code) {
                alert('コードを入力してください。');
                return;
            }

            // アナライザーのインスタンス化と実行
            const analyzer = new CodeAnalyzer(code);
            const report = analyzer.execute();

            // 画面への描画処理
            const resultBox = document.getElementById('resultBox');
            const scoreDisplay = document.getElementById('scoreDisplay');
            const detailList = document.getElementById('detailList');

            resultBox.style.display = 'block';
            
            const isAi = report.aiProbability > 50;
            scoreDisplay.innerHTML = `判定結果: <span class="${isAi ? 'ai-high' : 'human-high'}">${isAi ? 'AI生成コードの可能性大' : '人間が書いたコードの可能性大'}</span> (${report.aiProbability}% AIらしさ)`;

            detailList.innerHTML = `
                <h3>詳細な特徴比較評価:</h3>
                <ul>
                    <li><b>コメントの特徴評価:</b> ${report.details.comment.message} (スコア: ${report.details.comment.score}/100)</li>
                    <li><b>コード規約・一貫性評価:</b> ${report.details.styling.message} (スコア: ${report.details.styling.score}/100)</li>
                    <li><b>構文の複雑性と堅牢性評価:</b> ${report.details.complexity.message} (スコア: ${report.details.complexity.score}/100)</li>
                </ul>
                <p><small>※本ツールは、AIが好む過剰な規則性・丁寧な例外処理、人間特有の粗雑さや不規則性の統計的差異をシミュレートして評価しています。</small></p>
            `;
        });
    </script>
</body>
</html>
