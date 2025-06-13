// Simple Calculator TypeScript Project
type Operation = "+" | "-" | "*" | "/" | "**" | "%";

interface CalculationResult {
  result: number;
  expression: string;
  isValid: boolean;
  error?: string;
}

class Calculator {
  /**
   * 四則演算を実行する
   */
  calculate(
    num1: number,
    operator: Operation,
    num2: number
  ): CalculationResult {
    const expression = `${num1} ${operator} ${num2}`;

    try {
      let result: number;

      switch (operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        case "/":
          if (num2 === 0) {
            return {
              result: 0,
              expression,
              isValid: false,
              error: "0で割ることはできません",
            };
          }
          result = num1 / num2;
          break;
        case "**":
          result = Math.pow(num1, num2);
          break;
        case "%":
          if (num2 === 0) {
            return {
              result: 0,
              expression,
              isValid: false,
              error: "0で割る余りは計算できません",
            };
          }
          result = num1 % num2;
          break;
        default:
          return {
            result: 0,
            expression,
            isValid: false,
            error: `不正な演算子: ${operator}`,
          };
      }

      return {
        result: Math.round(result * 1000000) / 1000000, // 精度を6桁に制限
        expression,
        isValid: true,
      };
    } catch (error) {
      return {
        result: 0,
        expression,
        isValid: false,
        error: `計算エラー: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * 複数の計算を連続実行
   */
  calculateChain(
    operations: Array<{ num: number; operator: Operation }>
  ): CalculationResult {
    if (operations.length < 2) {
      return {
        result: 0,
        expression: "",
        isValid: false,
        error: "少なくとも2つの数値が必要です",
      };
    }

    let result = operations[0].num;
    let expression = result.toString();

    for (let i = 1; i < operations.length; i++) {
      const calc = this.calculate(
        result,
        operations[i].operator,
        operations[i].num
      );
      if (!calc.isValid) {
        return calc;
      }
      result = calc.result;
      expression += ` ${operations[i].operator} ${operations[i].num}`;
    }

    return {
      result,
      expression,
      isValid: true,
    };
  }
}

function demonstrateCalculator(): void {
  const calculator = new Calculator();

  console.log("=== TypeScript 計算機デモ ===\n");

  // 基本的な計算例
  const calculations = [
    { num1: 10, operator: "+" as Operation, num2: 5 },
    { num1: 20, operator: "-" as Operation, num2: 8 },
    { num1: 6, operator: "*" as Operation, num2: 7 },
    { num1: 15, operator: "/" as Operation, num2: 3 },
    { num1: 2, operator: "**" as Operation, num2: 3 },
    { num1: 17, operator: "%" as Operation, num2: 5 },
    { num1: 10, operator: "/" as Operation, num2: 0 }, // エラーケース
  ];

  calculations.forEach(({ num1, operator, num2 }) => {
    const result = calculator.calculate(num1, operator, num2);
    if (result.isValid) {
      console.log(`${result.expression} = ${result.result}`);
    } else {
      console.log(`${result.expression} = エラー: ${result.error}`);
    }
  });

  console.log("\n=== 連続計算例 ===");
  const chainResult = calculator.calculateChain([
    { num: 10, operator: "+" as Operation },
    { num: 5, operator: "*" as Operation },
    { num: 2, operator: "-" as Operation },
    { num: 3, operator: "/" as Operation },
  ]);

  if (chainResult.isValid) {
    console.log(`${chainResult.expression} = ${chainResult.result}`);
  } else {
    console.log(`エラー: ${chainResult.error}`);
  }
}

// コマンドライン引数から計算を実行
function executeFromCommandLine(): void {
  const args = process.argv.slice(2);

  if (args.length === 3) {
    const num1 = parseFloat(args[0]);
    const operator = args[1] as Operation;
    const num2 = parseFloat(args[2]);

    if (isNaN(num1) || isNaN(num2)) {
      console.log("エラー: 有効な数値を入力してください");
      return;
    }

    const calculator = new Calculator();
    const result = calculator.calculate(num1, operator, num2);

    if (result.isValid) {
      console.log(`${result.expression} = ${result.result}`);
    } else {
      console.log(`エラー: ${result.error}`);
    }
  } else {
    demonstrateCalculator();
  }
}

// メイン実行ȿ
if (require.main === module) {
  executeFromCommandLine();
}

export { Calculator, type Operation, type CalculationResult };