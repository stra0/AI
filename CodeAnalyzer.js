import { CommentEvaluator } from './CommentEvaluator.js';
import { StylingEvaluator } from './StylingEvaluator.js';
import { ComplexityEvaluator } from './ComplexityEvaluator.js';

export class CodeAnalyzer {
    constructor(sourceCode) {
        this.sourceCode = sourceCode;
        // 異なる視点を持つ評価オブジェクトを配列で管理（オープン・クローズドの原則）
        this.evaluators = [
            new CommentEvaluator(),
            new StylingEvaluator(),
            new ComplexityEvaluator()
        ];
    }

    execute() {
        let totalAiScore = 0;
        const details = {};

        // 各評価クラスにコードを渡してポリモーフィックに評価を実行
        this.evaluators.forEach(evaluator => {
            const result = evaluator.evaluate(this.sourceCode);
            totalAiScore += result.score;
            details[evaluator.getKey()] = result;
        });

        // 評価器の数で平均値を算出
        const averageAiProbability = Math.round(totalAiScore / this.evaluators.length);

        return {
            aiProbability: averageAiProbability,
            details: details
        };
    }
}
