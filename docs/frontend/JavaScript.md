---
sidebarDepth: 2
---
# JavaScript

## 类型

```javascript
typeof undefined === 'undefined'
typeof null === 'object'
typeof 123 === 'number'
typeof '123' === 'string'
typeof true === 'boolean'
typeof Symbol() === 'symbol'
typeof 123n === 'bigint'
typeof {} === 'object'
typeof function () {} === 'function'

// 对于引用数据类型，除了函数以外都会是显示object
// instanceof
var str1 = 'hello wordl';
str1 instanceof String // false

var str2 = new String('hello wordl');
str2 instanceof String // true
```
## 转换
```JavaScript
// 转换类型只有三种，转成数字，转成布尔值，转成字符串
// false , 其他的都会转成true
console.log(Boolean()) 
console.log(Boolean(false)) 
console.log(Boolean(undefined)) 
console.log(Boolean(null)) 
console.log(Boolean(+0))
console.log(Boolean(-0)) 
console.log(Boolean(NaN))
console.log(Boolean("")) 
```
### 转化为数组
```JavaScript
var set = new Set([1, 2])

Array.from(set)

[...set]
// 转换类数组对象arguments，Nodelist
Array.prototype.slice.call(arguments)
```
### 数组扁平化
```JavaScript
let ary = [1, [2, [3, [4, 5]]], 6];

// ES6的flat方法
let arr = ary.flat(Infinity)

// replace + split
let str = JSON.stringify(ary);
let arr = str.replace(/(\[|\])/g, '').split(',')

// 递归
function fn (arr) {
  let newArr = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      newArr = newArr.concat(fn(item))
    }
    else {
      newArr.push(item)
    }
  })
  return newArr
}


```
## 去重
```JavaScript
var arr = [1, 2, 2, 1, 4, 5, 6, 7, 4, 5, 6, 6];

// Set
Array.from(new Set(arr))
// indexOf
function unique (arr) {
  var res = [];
  for (let i = 0; i < arr.length; i++) {
    var current = arr[i];
    if (res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res;
}

function unique (arr) {
  var res = [];
  for (let i = 0; i < arr.length; i++) {
    var current = arr[i];
    if (!res.includes(current)) {
      res.push(current)
    }
  }
  return res;
}
```

## call
```javascript
Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args + ')');

  delete context.fn
  return result;
}

// apply
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}

```

## DOM

- DOM事件类

事件级别
> DOM0  element.onclick=function(){}
>
> DOM2  element.addEventListener('click',function(){},false)
>
>DOM3  element.addEventListener('keyup',function(){},false)

事件流

DOM事件的捕获具体流程
> window -> document -> html -> body -> ...  -> 目标元素

Event对象
```
event.preventDefault()// 阻止默认事件的执行
event.stoPropagation() // 防止事件冒泡，就是不触发任何前辈元素上的事件处理函数。
event.stoplmmendiatePropagation()// 阻止事件冒泡并且阻止相同事件的其他侦听器被调用。
event.currentTarget // 标示是当事件沿着DOM触发事件的当前标。它总是指向事件绑定元素 
event.target
```

- 自定义捕获事件
```html
<script>
  let ev = document.getElementById('ve');
  let eve = new Event('test');
  ev.addEventListener('test', function () {
    console.log(123)
  });
  ev.dispatchEvent(eve)
</script>
```

- 创建对象方式
```html
<script>
  // 字面量
  var o1 = {
    name:'o1'
  };
  var o2 = new Object({
    name: 'o2'
  });
  // 构造函数
  var M = function(name){
    this.name = name;
  };
  var o3 = new M('o3')
  // Object.create
  var p = {
    name: 'p'
  };
  var o4 = Object.create(p);
</script>
```

## 原型链

在JavaScript中，每当定义一个函数数据类型的时候，都会天生自带个`prototype`属性，这个属性指向函数的原型对象。

- __porto__ 
  每个JavaScript对象（除了null）都具有的一个属性，指向该对象的原型。
  ```javascript
  function Person () {

  }
  var person = new Person();
  console.log(person.__proto__ === Person.prototype); // true
  ```
- constructor
  ```javascript
  function Person () {}
  console.log(Person === Person.prototype.constructor); // true
  ```

`prototype`、`__proto__`、`constructor`
```javascript
function Person() {

}

var person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

- 实例和原型
  当读取实例属性时，如果找不到，会查找与对象关联的原型中的属性，还找不到就去找原型的原型，一直向上找到顶层为止。
  ```JavaScript
  function Person () {}
  Person.prototype.name = 'Kevin';
  
  var person = new Person();

  person.name = 'Daisy';
  console.log(person.name) // Daisy

  delete person.name;
  console.log(person.name) // Kevin


  // 原型也是对象
  var obj = new Object();
  obj.name = 'Kevin'
  console.log(obj.name) // Kevin

  // Object.prototype的原型
  console.log(Object.prototype.__proto__ === null) // true
  // null 表示“没有对象”，即该处不应该有值。
  // 查找到Object.prototype就停止了
  ```

## 作用域

JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。

因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。

而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。
```javascript
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar(); // 1
// 执行foo函数，从内部查找局部变量value，没有从调用函数的作用域查找
```

## 错误

即时运行错误：代码错误
> 用`try..catch` `window.onerror`捕获

资源加载错误

资源加载错误不会冒泡
> `object.onerror` 、 `performance.getEntries()`、Error事件捕获

- 跨域js运行错误

错误信息是：Script error，但是出错行号列号都是0，没有权限。
> 在script标签上增加`crossorigin`属性(客户端)。
>
> 在js资源响应头`Access-Control-Allow-Origin:*`（服务端）

- 上报错误

1. 用Ajax通信上报。
2. 利用Image对象上报。
> `(new Image()).src='';`