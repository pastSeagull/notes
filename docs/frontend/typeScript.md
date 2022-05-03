# typeScript
ts 笔记

## 数据类型

基本类型就不用说了吧

### 类型推论
如果没明确的规定类型，ts会根据类型去推论
```ts
let name = 'Gaviota'
name = 17
// Type 'number' is not assignable to type 'string'.
// 相当于
let name: string = 'Gaviota'
name = 17
```
 - 但是如果在定义的时候，没有赋值，不管以后有没有赋值，都会当成`any`类型。

### 联合类型
```ts
let joint: number | string = 'Gaviota'
joint = 17
```
- 当ts不确定联合类型是那个类型时，我们只能访问联合类型共有的属性和方法
```ts
function getLength(something: string | number): number {
    return something.length;
}
/* Property 'length' does not exist on type 'string | number'.
Property 'length' does not exist on type 'number'. */
// 访问共有属性就没问题
function getString(something: string | number): string {
    return something.toString();
}
```
- 联合类型在赋值的时候，会根据类型推断出一个类型
```ts
let cc: string | number
cc = 'cc'
console.log(cc.length) // 2
cc = 17 // 这里推断成立number，访问length就会报错
console.log(cc.length) // Property 'length' does not exist on type 'number'.
```
### 接口
```ts
interface Person {
    name: string
    age: number
}
const seagull: Person = {
    name: 'Gaviota',
    age: 17
}

// 多属性或者少属性都是不允许的
// 可选属性
interface Person {
  name: string
  age?: number
}
const seagull: Person = {
  name: 'gaviota'
}

// 任意属性
interface Person {
  name: string
  age?: number
  [address: string]: any
}
const seagull: Person = {
  name: 'gaviota',
  address: 'norway '
}
// 只读类型
interface Person {
  readonly id: number
  name: string
}
const seagull: Person = {
  id: 1,
  name: 'gaviota'
}
```

### 数组
```ts
let num: number[] = [1, 2, 3, 4, 5]
num.push('6') // Argument of type 'string' is not assignable to parameter of type 'number'.

// 数组泛型
let num: Array<number> = [1, 2, 3, 4, 5]
// 接口
interface num {
  [index: number]: number
}
let arr: num = [1, 2, 3, 4, 5]
// 类数组
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
// 不过类数组都有自己的定义
IArguments, NodeList, HTMLCollection
```

### 函数
```ts
function sum(x: number, y: number): number {
  return x + y
}
```
像函数表达式，只会对右侧的匿名函数进行类型的定义
```ts
const sum = function(x: number, y: number): number {
  return x + y
}
// 这样定义，这里的箭头函数和ES6不同。
let sum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```
- 使用接口定义函数
```ts
interface add {
  (x: number, y: number): number
}
let sum: add
sum = function(x: number, y: number) {
  return x + y
}
```
- 可选参数
可选参数必须放在最后面
```ts
function sum (x: number, y?: number) {
  return y ? y + x : x
}
```
- 重载
可以输入数字或字符
```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

### 内置类型
```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```
- DOM和BOM的内置对象
```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```
### 类型别名
```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```
## 元组
定义一个简单的元组
```ts
let tom: [string, number] = ['tom', 17]
```
## 枚举
使用`enum`来定义
```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
// 编译结果
"use strict";
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
;
```

## 类
三种修饰符`public`、`private`、`protected`
```ts
class Animal {
  public name;
  public constructor(name: string){
    this.name = name
  }
}
let a = new Animal('seagull')
console.log(a.name) // seagull
a.name = 'Tom'
console.log(a.name) // Tom

// 如果name改成private
console.log(a.name) // Property 'name' is private and only accessible within class 'Animal'.
a.name = 'Tom' // Property 'name' is private and only accessible within class 'Animal'.

// 在子类中也是无法访问的
class Animal {
  private name
  public constructor(name) {
    this.name = name
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name)
    console.log(this.name) // Property 'name' is private and only accessible within class 'Animal'.
  }
}
// 想要在子类中访问使用的是 protected
```
- 构造函数的修饰
```ts
class Animal {
  public name
  private constructor(name: string) {
    this.name = name
  }
}
class Cat extends Animal { // Cannot extend a class 'Animal'. Class constructor is marked as private.
  constructor(name: string) {
    super(name);
  }
}

let a = new Animal('Jack')
// Constructor of class 'Animal' is private and only accessible within the class declaration.

// 构造函数改成 protected 只允许继承
let a = new Animal('Jack') // Constructor of class 'Animal' is protected and only accessible within the class declaration.

// 只读类型
class Animal {
  readonly name
  public constructor(name: string) {
    this.name = name
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom' // Cannot assign to 'name' because it is a read-only property.
// 也可以这样写
class Animal {
  public constructor(public readonly name: string) {
  }
}
```
### 抽象类
抽象类不允许被实例化
```ts
abstract class Animal {
  public name
  public constructor(name: string) {
    this.name = name
  }
  public abstract sayHi(): Function
}

let a = new Animal('Jack') // Cannot create an instance of an abstract class.

// 方法必须被子类实现
abstract class Animal {
  public name
  public constructor(name: string) {
    this.name = name
  }
  public abstract sayHi()
}

class Cat extends Animal {
  public eat() {
    console.log(`${this.name} is eating.`)
  }
}

let cat = new Cat('Tom')

// 类的类型
class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  sayHi(): string {
    return `My name is ${this.name}`
  }
}

let a: Animal = new Animal('Jack')
console.log(a.sayHi()) // My name is Jack
```
## 类和接口
```ts
interface Alarm {
    alert(): void
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert')
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert')
    }
}

// 多个接口
interface Alarm {
    alert(): void
}

interface Light {
    lightOn(): void
    lightOff(): void
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert')
    }
    lightOn() {
        console.log('Car light on')
    }
    lightOff() {
        console.log('Car light off')
    }
}

// 接口继承，LightableAlarm继承了Alarm
interface Alarm {
    alert(): void
}

interface LightableAlarm extends Alarm {
    lightOn(): void
    lightOff(): void
}
```
- 接口继承类

在创建`Point`类，同时也创建了`Point`的类型，所以可以接口继承类

```ts
class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

interface Point3d extends Point {
    z: number
}

let point3d: Point3d = {x: 1, y: 2, z: 3}
```

## 泛型
若是设置为`Array<any>`，数组中每一项都是任意类型了。
使用泛型，则数组中每一项都是`value`的类型
```ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result
}
createArray<string>(3, 'x') // ["x", "x", "x"] 

// 多个泛型
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
swap([7, 'seven']) // ['seven', 7]
```
### 泛型约束
- 对于使用泛型，事先不知道它是什么类型的，所以不能随意的操作它的属性或方法
```ts
// 泛型T不一定拥有length属性
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length) // Property 'length' does not exist on type 'T'.
    return arg
}

// 可以对泛型进行约束，这样在操作length时就不会报错了
// 进行约束后，传入的值必须包含length属性，否则就会报错
interface Lengthwise {
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
}

// 多个泛型之间互相约束
// T 继承了 U ，这样保证 U 中不会出现 T 不存在的字段
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id]
    }
    return target
}

let x = { a: 1, b: 2, c: 3, d: 4 }
copyFields(x, { b: 10, d: 20 })

// 泛型接口
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

createArray(3, 'x') // ['x', 'x', 'x']
```