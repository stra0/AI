import { Evaluator } from './Evaluator.js';

export class ComplexityEvaluator extends Evaluator {
    constructor() {
        super('complexity', '構造の堅牢性と複雑性評価');
    }

    evaluate(sourceCode) {
        let aiScore = 50;

        // アーリーリターンのチェック (if (条件) return;)
        const earlyReturnMatches = sourceCode.match(/if\s*\(.*\)\s*\{\s*return/g);
        // エラーハンドリングのチェック
        const hasTryCatch = sourceCode.includes('try') && sourceCode.includes('catch');

        if (earlyReturnMatches && earlyReturnMatches.length >= 2) {
            aiScore += 20; // 洗練されたガード節パターン
        }
        if (hasTryCatch) {
            aiScore += 20; // 模範的な防御的プログラミング
        }

        // 深すぎる人間的なネスト (ifの4重ネストなどを簡易検出)
        const deepNestPattern = /if\s*\(.*\{\s*if\s*\(.*\{\s*if\s*\(.*\{\s*if/g;
        if (deepNestPattern.test(sourceCode)) {
            aiScore -= 30; // AIがあまり出力しない、リファクタリングされていない複雑な構造
        }

        aiScore = Math.max(0, Math.min(100, aiScore));

        let message = '一般的な処理構造です。';
        if (aiScore > 70) message = 'try-catchによる例外防御や、無駄のないガード節が完璧に配置されたAI特有の堅牢なコードです。';
        if (aiScore < 40) message = 'エラーハンドリングの欠落や、リファクタリングされていない深いネスト構造があり、人間的です。';

        return { score: aiScore, message: message };
    }
}
