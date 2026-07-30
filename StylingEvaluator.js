import { Evaluator } from './Evaluator.js';

export class StylingEvaluator extends Evaluator {
    constructor() {
        super('styling', 'コーディング規約一貫性評価');
    }

    evaluate(sourceCode) {
        let aiScore = 50;

        // AI特有の完璧な記述のチェック
        const hasVar = sourceCode.includes('var '); // AIは現代的なlet, constを徹底する傾向
        const hasInconsistentSpacing = /(\){|else{)/.test(sourceCode); // 人間がやりがちなスペースの詰め

        if (!hasVar) aiScore += 15; // 徹底されたモダンな宣言
        if (hasInconsistentSpacing) {
            aiScore -= 25; // フォーマッタを通していない人間特有の揺らぎ
        } else {
            aiScore += 15; // 完璧なフォーマット一貫性
        }

        // AIモデルが好む変数命名パターン（意味が通りすぎる長い英語名など）の簡易模倣
        const longVariablePattern = /[a-z]+[A-Z][a-zA-Z]{15,}/g; 
        const matches = sourceCode.match(longVariablePattern);
        if (matches && matches.length > 2) {
            aiScore += 20; // 丁寧すぎる命名規則
        }

        aiScore = Math.max(0, Math.min(100, aiScore));

        let message = '標準的な一貫性です。';
        if (aiScore > 70) message = 'フォーマットが完璧に整っており、変数名が一貫して論理的でAI生成の兆候があります。';
        if (aiScore < 40) message = 'インデントの揺らぎや、手動でタイピングしたと思われる記述の癖が見られます。';

        return { score: aiScore, message: message };
    }
}
