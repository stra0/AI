export class Evaluator {
    constructor(key, name) {
        if (new.target === Evaluator) {
            throw new TypeError("Evaluatorクラスは直接インスタンス化できません。");
        }
        this.key = key;   // 識別子
        this.name = name; // 評価基準名
    }

    getKey() {
        return this.key;
    }

    getName() {
        return this.name;
    }

    // 子クラスで必ずオーバーライドさせるメソッド
    evaluate(sourceCode) {
        throw new Error("evaluate() メソッドが実装されていません。");
    }
}
