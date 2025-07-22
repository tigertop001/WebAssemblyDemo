import assert from "assert";
import {add, fib} from '../build/release.js'
// preformance 做一下性能的评估
performance.mark("wasm_start");
assert.strictEqual(add(1,2),3);
assert.strictEqual(fib(10),55);
performance.mark("wasm_end");
performance.measure("wasm_time","wasm_start","wasm_end")
console.log(performance.getEntriesByName("wasm_time"))


function js_add(a, b) {
    let res = 0
    for (let i = 0 ; i <1000000000; i++){
        res = 0;
    }
    return a+b;
}

performance.mark("js_start");
assert.strictEqual(js_add(1,2),3);


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
assert.strictEqual(js_fib(10),55);

performance.mark("js_end");
performance.measure("js_time","js_start","js_end");
console.log(performance.getEntriesByName("js_time"));