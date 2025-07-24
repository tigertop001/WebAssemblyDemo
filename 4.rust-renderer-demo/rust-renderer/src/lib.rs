#![allow(deprecated)]

mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn hello(){
    alert("Hello");
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, rust-renderer!");
}

#[wasm_bindgen]
pub fn sum() -> i32{
    let mut sum = 0;
    for i in 0..100000{
        sum += i;
    }
    return sum;
}

#[wasm_bindgen]
pub fn draw(){
    let document = web_sys::window().unwrap().document().unwrap();
    document.body().unwrap().set_inner_html("Hello, rust-renderer!")
}

#[wasm_bindgen]
pub fn draw_triangle(){
    let window =  web_sys::window().unwrap();
    let document = window.document().unwrap();
    let canvas = document.create_element("canvas").unwrap().dyn_into::<web_sys::HtmlCanvasElement>().unwrap();
    canvas.set_attribute("width","1920").unwrap();
    canvas.set_attribute("height","800").unwrap();
    document.body().unwrap().append_child(&canvas).unwrap();
    let context = canvas.get_context("2d").unwrap().unwrap().dyn_into::<web_sys::CanvasRenderingContext2d>().unwrap();

    // context.begin_path();
    // context.move_to(50.0,0.0);
    // context.line_to(100.0, 100.0);
    // context.line_to(0.0,100.0);
    // context.close_path();
    // context.stroke();

    // 绘制一万个矩形
    for i in 0..10000{
        // 根据位置和随机颜色绘制
        let x = (i % 300) as f64 * 10.0; // 每行192个矩形
        let y = (i / 300) as f64 * 10.0; // 垂直排列

        // 固定大小
        let size = 10.0;
        let color = format!("rgb({},{},{})", i % 255, (i * 2) % 255, (i * 3) % 255);
        
        // 使用正确的方法设置填充样式
        context.set_fill_style(&wasm_bindgen::JsValue::from_str(&color));
        context.fill_rect(x, y, size*i as f64, size*i as f64);
    }
}