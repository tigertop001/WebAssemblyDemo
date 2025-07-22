(module
 (type $0 (func (param f64 f64) (result f64)))
 (global $~lib/memory/__data_end i32 (i32.const 8))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 32776))
 (global $~lib/memory/__heap_base i32 (i32.const 32776))
 (memory $0 0)
 (table $0 1 1 funcref)
 (elem $0 (i32.const 1))
 (export "add" (func $assembly/index/add))
 (export "sub" (func $assembly/index/sub))
 (export "memory" (memory $0))
 (func $assembly/index/add (param $0 f64) (param $1 f64) (result f64)
  local.get $0
  local.get $1
  f64.add
  return
 )
 (func $assembly/index/sub (param $0 f64) (param $1 f64) (result f64)
  local.get $0
  local.get $1
  f64.sub
  return
 )
)
