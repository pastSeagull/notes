# React

## JSX

JSX 是一个 JavaScript 的语法扩展，JSX 可以生成 React 元素

```javascript
const element = <h1 className="element">Hello, world</h1>;
```

实际上 JSX 是`React.createElement(component, props, ...children)`函数的语法糖

通过 Babel 编译

```javascript
const element = React.createElement(
  "h1",
  {
    className: "element",
  },
  "Hello, world"
);
```

```javascript
import React from "react";
import ReactDOM from "react-dom";

const title = <h1>title</h1>;

ReactDOM.render(title, document.getElementById("root"));
```

- 所以必须引入 React，否则会报错。

- 定义的组件必须是大写字母开头 `<Title />`。

- 标签的包裹
  > JSX 中的 html 代码第一层只能写一个元素，如果多个标签并列会语法错误，多个标签并列可以用 div 包裹起来。
  >
  > `Module build failed: SyntaxError: Adjacent JSX elements must be wrapped in an enclosing tag (35:2)`

## 事件

- Reeact 事件命名是驼峰式，不是纯小写

```javascript
<button onclick="fun">click</button>

// React
<button onClick={fun}>click</button>

```

- 还有就是不能通过返回`false`的方式来阻止默认行为，必须使用`preventDefult`。

```JavaScript
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>

// React
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

`e`是合成事件，不用担心游览器兼容性问题。
用 ES6 class 语法定义组件需要绑定`this`

```javascript
constructor(){
  this.handleClick = this.handleClick.bind(handleClick);

  onClick={this.handleClick}
}
```

也可以使用正在实践性的`public class fields`语法。

```JavaScript
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

回调中使用箭头函数

```JavaScript
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }
  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

事件传递参数

```JavaScript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

## 组件

```JavaScript
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// class定义

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

```

当 React 自定义组件时，会接收 JSX 的属性以及子组件转化为单个对象传递给组件。props

```JavaScript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

- Props 只读性，无论时函数声明还是 class，不能修改自身的 props。

- 不要直接修改 State，

```JavaScript
// 不会重新渲染组件
this.state.comment = 'Hello';

// 应该使用setState()
this.setState({comment: 'Hello'})
```

- State 的更新可能时异步的

```javascript
constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.btn = this.btn.bind(this)
  }
  btn () {
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count) // 0
  }
  render () {
    return (
      <div>
        {this.state.count} // 1
        <button onClick={this.btn}>btm</button>
      </div>
    )
  }
```

> 会根据一个`isBatchingUpdates`来判断直接更新 this.state 还是放到列队中，`isBatchingUpdates`默认时 false，
> 表示 setState 会同步更新 this.state，但是`batchedUpdates`会把`isBatchingUpdates`修改为 true。React 在调用
> 事件处理函数之前就会调用`batchedUpdates`。就是事件处理过程不会 setState 不会同步更新 this.state。
> <a herf="https://github.com/sisterAn/blog/issues/26"></a>

```JavaScript
this.setState((state, props) => ({
  count: this.state.count + 1
}))


this.setState({
      count: this.state.count + 1
 },() => {
   console.log(this.state.count) // 1
 })

```

## 条件运算符

-

```javascript
// count: 12
render () {
    return (
      <div>
        {this.state.count > 0 && <h2>{this.state.count}</h2>}
      </div>
    )
  }

  // 三目运算符
  The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.

  // 阻止组件渲染
  if(!props.warn) return null;
```

## 列表渲染

```JavaScript
cosnt number = [1, 2, 3, 4, 5];
const listItems = number.map((number) => <li>{number}</li>);

// 组件接收number数组作为产生输入列表
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

// key
const todoItems = todos.map((todo, index) =>
  <li key={index}>
    {todo.text}
  </li>
);
```

然后就是 key，key 时一个元素在列表中一个独一无二的字符串。万不得已才使用元素的索引。

> key 会传递信息给 React，但是不会传递给你的组件，可以换个属性名`<POst key={post.id} id={post.id} />`

## 表单

- 受控组件

渲染表单的 React 组件还控制着用户的输入过程中表单发生的操作。

```javascript
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState(
      {
        value: value.target.value,
      },
      () => {
        console.log(this.state.value);
      }
    );
  }
  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
```

## Redux

==

## Hook

16.8 新特性，不编写 class 情况下使用 state 和其他的 React 特性。

```js
// useState
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

// Effect 可以让你在函数组件执行副作用操作
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clincked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

- useMemo & useCallback

```js
function App() {
  const [x, setX] = useState(0);

  const y = useMemo(() => {
    x * 2;
  }, [x]);

  const changeX = useCallback(() => {
    setX(x + 1);
  }, [x]);
  return (
    <div>
      <div onClick={changeX}>x{x}</div>
      <div>y{y}</div>
    </div>
  );
}
```
