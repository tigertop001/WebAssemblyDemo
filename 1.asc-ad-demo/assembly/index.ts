// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}


// // 通过递归实现斐波拉契数列
// export function fib(n:i32): i32{
//   if (n<=1){
//     return n;
//   }
//   return fib(n-1) + fib(n-2);
// }


export function fib(n: number):number{
  if(n<0){
      return n;
  }
  if(n === 0 || n ===1){
      return n;
  }
  let dp:number[] = [];
  dp[0] = 0;
  dp[1] = 1;
  for(let i=2; i <=n; i++){
      dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n as i32]
}