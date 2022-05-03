# Rust

> 首先这是个人学习rust的一些笔记，并不是很正确。

~~首先我们来启动xx开发工具，在菜单栏中选择【文件】 ——> 【新建文件】然后文件名为...~~

```rust
fn main () {
    let p = "hello";
    println!("{}", p)
}
```

- rust宏
```rust
println!("{}", 1); // 默认用法
println!("{:o}", 9); //  八进制
println!("{:x}", 255); // 十六进制 小写
println!("{:X}", 255); // 大写
println!("{:p}", &0); // 指针
println!("{:b}", 15); // 二进制
println!("{:e}", 10000f32); // 科学计数(小写)
println!("{:E}", 10000f32); // 科学计数(大写)
println!("{:?}", "test"); // 打印Debug
println!("{:#?}", ("test1", "test2")); // 带换行和缩进的Debug打印
println!("{a} {b} {b}", a = "x", b = "y"); // 命名参数
```

## 变量和类型

首先就是变量类型了

Rust的变量必须先声明后使用
```rust
let v : i32 = 1;

// 只读
let x = 5;
x = 10; // re-assignment of immutable variable`x`

// 使用关键字
let mut x = 5;
x = 10
// or
let (mut a, mut b) = (1, 2);

// 遮蔽!后面的不是对x重新赋值，而是又声明了一个变量，名字和前面变量相同。前面的x变量已经无法在进行访问了
let x = "hello";
println!("x is {}", x);
let x = 5;
println!("x is {}", x);

// 类型推导，通过当前语句和上下文信息推导
// Rust只允许“局部变量/全局变量”实现类型推导

// 起别名
type Age = u32;
let v : Age = 20;

// 局部变量可以后面在初始化，全局必须声明后初始化
// 全部变量读写必须用上 unsafe
static mut v : i32 = 2;
unsafe {
  v = 3;
}
```
## 数据类型
```rust
let var5 = 0x_1234_ABCD; // 下标方便阅读作用

// 类型转换，不能偷偷摸摸的转换，要光明正大的转换
// as也不是随便用的，要合理
let var1 : i8 = 41;
let var2 : i16 = var1 as i16;

// 元组 tuple
let p = (1i32, 2i32);
let (a, b) = p;
let x = p.0;
let y = p.1;
println!("{} {} {} {}", a, b, x, y);

// 结构体 struct，和元组差不多，不过每个元素都有自己的名字
struct Point {
  x: i32,
  y: i32,
}

// tuple struct，融合怪，tuple struct有名字，而它们的成员没有名字
struct Point(i32, i32, i32);
struct Point { 
  0: i32,
  1: i32,
  2: i32,
}

// enum
enum Number {
  Int(i32),
  Float(f32),
}

```
