import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import init,{hello, greet, sum, draw, draw_triangle} from "../rust-renderer/pkg/rust_renderer"


function App() {
  const [count, setCount] = useState(0)
  const [wasmLoaded, setWasmLoaded] = useState(false);
  const [sumResult, setSumResult] = useState<number | null>(null);

  useEffect(()=>{
    const initWasm = async () =>{
      try {
        await init();
        setWasmLoaded(true)
        console.log('WebAssembly 模块加载成功')
      } catch (error) {
        console.error('WebAssembly 模块加载失败', error )        
      }
    }
    initWasm()
  },[])

  // wasm函数调用处理器
  const handleHello = () =>{
    if(wasmLoaded){
      hello();
    }
  }

  const handleGreet = () => {
    if(wasmLoaded){
      greet();
    }
  }

  const handleSum = () => {
    if(wasmLoaded){
      const result = sum();
      setSumResult(result);
    }
  }

  const handleDraw = () => {
    if(wasmLoaded){
      draw()
    }
  }

  const handleDrawTriangle = () => {
    if(wasmLoaded){
      // 清除之前的canvas
      const existingCanvas = document.querySelector('canvas');
      if(existingCanvas){
        existingCanvas.remove();
      }
      draw_triangle()
    }
  }

  const handleClearPage = () => {
    // 清除 canvas 和结果
    const existingCanvas = document.querySelector('canvas');
    if(existingCanvas){
      existingCanvas?.remove();
    }
    setSumResult(null);

    // 重置 body 内容 (除了 root 元素)
    const body = document.body;
    const root = document.getElementById('root');
    body.innerHTML = '';
    if(root){
      body.appendChild(root);
    }
  }



  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/** 原有的 React 计数器*/}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {/** WebAssembly 功能测试按扭 */}
      <div>
        <p>WebAssembly 状态:{ wasmLoaded ? "已加载" : "加载中..."}</p>
      </div>

      {/** WebAssembly 功能测试按扭 */}
      {wasmLoaded && (
        <div className="card">
          <h2>Rust WebAssembly 功能测试</h2>
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center'}}>
            <button onClick={handleHello}>Hello 弹窗</button>
            <button onClick={handleGreet}>Greet 弹窗</button>
            <button onClick={handleSum}>计算求和</button>
            <button onClick={handleDraw}>绘制文本</button>
            <button onClick={handleDrawTriangle}>绘制彩色矩形</button>
            <button onClick={handleClearPage}>清空页面</button>
          </div>
          {/* 显示求和结果 */}
          {sumResult != null && (
            <div style={{marginTop: '20px', padding: '10px', backgroundColor:'#f0f0f0', borderRadius: '5px'}}>
              <strong>Rust 求和结果 (0 到 99999):{sumResult.toLocaleString()}</strong>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default App
