export function add(a: number, b: number): number {
    let res: number = 0
    for (let i = 0; i < 1000000000; i++) {
        res = 0;
    }
    return a + b;
}

export function sub(a: number, b: number): number {
    return a - b;
}

// 斐波拉契数列
// dp 最不好的动态规划实现

export function fib(n: number): number {
    if (n < 0) {
        return n;
    }
    if (n === 0 || n === 1) {
        return n;
    }
    let dp: number[] = [];
    dp[0] = 0;
    dp[1] = 1;
    let index = <i32>n;
    for (let i = 2; i <= index; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[index];
}