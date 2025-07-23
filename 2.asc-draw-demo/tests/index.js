import assert from "assert";
performance.mark("add_start")
import { add,fib } from "../build/debug.js";
assert.strictEqual(add(1, 2), 3);
assert.strictEqual(fib(4), 3)
console.log(fib(45000),"******")
performance.mark("add_end")
performance.measure("add","add_start","add_end")
const add_measure = performance.getEntriesByName("add")[0]
console.log(`add:${add_measure.duration}ms`)

console.log("ok");
performance.mark("js_fib_start")
// 通过递归实现斐波拉契数列
// export function js_fib(n){
//     if (n<=1){
//       return n;
//     }
//     return js_fib(n-1) + js_fib(n-2);
//   }

export function js_fib(n){
    if(n<0){
        return n;
    }
    if(n === 0 || n ===1){
        return n;
    }
    let dp = [];
    dp[0] = 0;
    dp[1] = 1;
    for(let i=2; i <=n; i++){
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n]
}

console.log(js_fib(45000),'=======')
performance.mark("js_fib_end");
performance.measure("js_fib","js_fib_start","js_fib_end")
const js_fib_measure = performance.getEntriesByName("js_fib")[0]
console.log(`js_fib:${js_fib_measure.duration}ms`)


