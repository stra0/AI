import { Evaluator } from './Evaluator.js';

export class CommentEvaluator extends Evaluator {
    constructor() {
        super('comment', 'コメント品質・密度評価');
    }

    evaluate(sourceCode) {
        const lines = sourceCode.split('\n');
        const totalLines = lines.length;
        
        let commentLines = 0;
        let jsDocCount = 0;

        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
                commentLines++;
            }
            if (trimmed.includes('@param') || trimmed.includes('@returns')) {
                jsDocCount++;
            }
        });

        const commentRatio = totalLines > 0 ? (commentLines / totalLines) : 0;
        let aiScore = 50; // 基準値

        // AIはJSDocや丁寧なドキュメントコメントを好む
        if (jsDocCount > 0) aiScore += 30;
        // コメント密度が非常に高い(25%〜50%)場合はAIの可能性を疑う
        if (commentRatio > 0.25 && commentRatio < 0.5) aiScore += 15;
        // 人間はコメントを全く書かないか、極端に短い傾向がある
        if (commentRatio === 0 || commentRatio > 0.6) aiScore -= 20;

        // スコアの安全なクランプ処理
        aiScore = Math.max(0, Math.min(100, aiScore));

        let message = 'コメントの配置バランスが人間的です。';
        if (aiScore > 70) message = 'AI特有の極めて丁寧な解説、または洗練されたJSDocが検出されました。';
        if (aiScore < 40) message = 'コメントが少ない、または乱雑で、人間がアドホックに書いた痕跡が見られます。';

        return { score: aiScore, message: message };
    }
}
