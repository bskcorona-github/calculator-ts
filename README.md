# Calculator TypeScript

TypeScriptで作成されたシンプルな計算機プロジェクトです。四則演算やべき乗、余り計算をサポートしています。

## セットアップ

```bash
npm install
```

## 使い方

### 開発モード（デモを実行）

```bash
npm run dev
```

### コマンドライン計算

```bash
npm run dev -- 10 + 5
npm run dev -- 20 - 8
npm run dev -- 6 "*" 7
npm run dev -- 15 / 3
npm run dev -- 2 "**" 3  # べき乗
npm run dev -- 17 % 5    # 余り
```

### ビルドして実行

```bash
npm run build
npm start
```

## 機能

- **基本四則演算**: 加算(+)、減算(-)、乗算(\*)、除算(/)
- **追加演算**: べき乗(\*\*)、余り(%)
- **エラーハンドリング**: ゼロ除算や不正な演算子の検出
- **連続計算**: 複数の演算を連続実行
- **型安全性**: TypeScriptの型システムを活用
- **精度制御**: 浮動小数点の精度を6桁に制限

## API

### Calculator クラス

- `calculate(num1: number, operator: Operation, num2: number)`: 基本計算
- `calculateChain(operations: Array)`: 連続計算

### 対応演算子

- `+`: 加算
- `-`: 減算
- `*`: 乗算
- `/`: 除算
- `**`: べき乗
- `%`: 余り

## 例

```typescript
import { Calculator } from "./src/index";

const calc = new Calculator();
const result = calc.calculate(10, "+", 5);
console.log(result.result); // 15
```