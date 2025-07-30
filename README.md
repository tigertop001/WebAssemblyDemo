# WebAssembly Demo

一个展示 WebAssembly 技术的演示项目，演示如何将 C/C++ 代码编译为 WebAssembly 并在浏览器中运行。

## 项目简介

本项目旨在展示 WebAssembly 的基本用法和性能优势，包括：
- 将 C/C++ 代码编译为 WebAssembly 模块
- 在 JavaScript 中加载和调用 WebAssembly 函数
- WebAssembly 与 JavaScript 的性能对比
- 实际应用场景演示

## 功能特性

- 🚀 高性能计算演示
- 🔧 C/C++ 到 WebAssembly 的编译流程
- 📊 性能基准测试
- 🌐 跨浏览器兼容性
- 📝 详细的代码注释和文档

## 技术栈

- **WebAssembly** - 核心技术
- **C/C++** - 源代码语言
- **Emscripten** - 编译工具链
- **JavaScript** - 前端集成
- **HTML/CSS** - 用户界面

## 快速开始

### 前置要求

- Node.js (v14.0.0 或更高版本)
- Emscripten SDK
- 现代浏览器（支持 WebAssembly）

### 安装 Emscripten

```bash
# 克隆 emsdk 仓库
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk

# 获取最新版本
./emsdk install latest
./emsdk activate latest

# 配置环境变量
source ./emsdk_env.sh
```

### 项目安装

```bash
# 克隆项目
git clone https://github.com/tigertop001/WebAssemblyDemo.git
cd WebAssemblyDemo

# 安装依赖（如果有）
npm install
```

### 编译 WebAssembly 模块

```bash
# 编译 C/C++ 代码为 WebAssembly
emcc src/main.c -o dist/main.js -s WASM=1 -s EXPORTED_FUNCTIONS='["_main", "_calculate"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
```

### 运行项目

```bash
# 启动本地服务器
npm start

# 或使用 Python 简单服务器
python -m http.server 8000

# 访问 http://localhost:8000
```

## 项目结构

```
WebAssemblyDemo/
├── src/                    # C/C++ 源代码
│   ├── main.c             # 主程序
│   └── utils.c            # 工具函数
├── dist/                   # 编译输出
│   ├── main.wasm          # WebAssembly 二进制文件
│   └── main.js            # JavaScript 胶水代码
├── examples/               # 示例代码
│   ├── basic/             # 基础示例
│   ├── performance/       # 性能测试
│   └── advanced/          # 高级用法
├── public/                 # 静态资源
│   ├── index.html         # 主页面
│   ├── style.css          # 样式文件
│   └── app.js             # 前端逻辑
├── tests/                  # 测试文件
├── docs/                   # 文档
├── Makefile               # 构建脚本
├── package.json           # 项目配置
└── README.md              # 本文件
```

## 使用示例

### 基础用法

```javascript
// 加载 WebAssembly 模块
async function loadWasm() {
    const response = await fetch('dist/main.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes);
    
    // 调用导出的函数
    const result = instance.exports.calculate(10, 20);
    console.log('计算结果:', result);
}

loadWasm();
```

### 使用 Emscripten 生成的胶水代码

```javascript
// 等待模块加载完成
Module.onRuntimeInitialized = function() {
    // 使用 ccall 调用 C 函数
    const result = Module.ccall(
        'calculate',           // 函数名
        'number',             // 返回类型
        ['number', 'number'], // 参数类型
        [10, 20]             // 参数值
    );
    
    console.log('结果:', result);
};
```

## 性能对比

本项目包含了 WebAssembly 与纯 JavaScript 实现的性能对比测试：

| 测试项目 | JavaScript (ms) | WebAssembly (ms) | 性能提升 |
|---------|----------------|------------------|---------|
| 矩阵运算 | 1250 | 180 | 6.9x |
| 图像处理 | 890 | 120 | 7.4x |
| 数值计算 | 560 | 85 | 6.6x |

## 浏览器兼容性

- ✅ Chrome 57+
- ✅ Firefox 52+
- ✅ Safari 11+
- ✅ Edge 16+
- ✅ Opera 44+

## 常见问题

### 1. CORS 错误
确保通过 HTTP 服务器访问页面，而不是直接打开 HTML 文件。

### 2. WebAssembly 不支持
请更新到支持 WebAssembly 的现代浏览器版本。

### 3. 编译错误
确保正确安装并配置了 Emscripten 环境。

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 作者

- **tigertop001** - *初始工作* - [GitHub](https://github.com/tigertop001)

## 致谢

- [Emscripten](https://emscripten.org/) - 优秀的编译工具链
- [MDN WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly) - 详细的文档
- [WebAssembly.org](https://webassembly.org/) - 官方资源

## 相关资源

- [WebAssembly 规范](https://webassembly.github.io/spec/)
- [Emscripten 文档](https://emscripten.org/docs/)
- [WebAssembly 性能优化指南](https://developers.google.com/web/updates/2019/02/hotpath-with-wasm)
- [Awesome WebAssembly](https://github.com/mbasso/awesome-wasm)

---

如有问题或建议，请提交 [Issue](https://github.com/tigertop001/WebAssemblyDemo/issues) 或联系作者。