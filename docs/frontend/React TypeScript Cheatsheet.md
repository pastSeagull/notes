# React TypeScript Cheatsheet

这边只是对于这个文档的一些记录，记录也想常用(可能)的操作
更加具体的操作还是去看下面这个链接
https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example


## 基本

### Basic

- 指定精确的值
```ts
type TStatus = status: "waiting" | "success";
```

- arrayList
```ts
type objArr = {
  id: string;
  title: string;
}[];

const [objArr] = useState<objArr>(
    [
        {
            id: 1,
            title: "title"
        }
    ]
)
```

- key是同一个类型，但是值可以多个类型
```ts
type dict = {
    [key: string]: number | string;
}
// 或者这样，和上面那个一样
type dict2 = Record<string, number | string>

// use
const [dict] = useState<dict>(
    {
        "key": 1,
        "key1": "2",
    }
)
```

- 函数无返回值
```ts
const changeCount = ():void =>  {}
```

- event
```ts
const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {}
<input type="text" onChange={onChange}/>

const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {}
<button onClick={onClick}>1</button>
```

### 接收组件
把组件作为参数传递
- ReactNode
使用
```ts
export const Basic = ({ children }: { children: ReactNode }) => {
    return <div>
        {children}
    </div>
}

<Basic>
    <Title />
</Basic>
```
看一下`ReactNode`是什么
```ts
type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
```
一般来说使用`Interface`来定义接口属性就行了，不够用的时候在使用`type`。

然后一般来说函数组件是这样写的
> `FC`是`FunctionComponent`的缩写，里面定义默认的`props`
```ts
export const Basic: React.FC<{ children: ReactNode }> = ({ children } ) => {
    return <div>
        {children}
    </div>
}
```
然后就是在`react`版本在16.8后可以使用`VFC`，就是`VoidFunctionComponent`
注意`React18`弃用了VFC
https://www.mydatahack.com/using-react-vfc-instead-of-react-fc/


### Hooks

```ts
const [count, setCount] = useState<number>(0)
const [count, setCount] = useState<number | null>(null)
// 这种你可以不用写类型
const [count, setCount] = useState(0)
```

- 使用断言 as
> 我们创建一个`state`，但是初始值为`{}`。这样就会报错，这时候我们使用断言。
```ts
type TUser = {
    name: string,
    age: number
}
// Argument of type '{}' is not assignable to parameter of type 'TUser | (() => TUser)'.
const [user, setUser] = useState<TUser>({})
// as
const [user, setUser] = useState<TUser>({} as TUser)
```

#### useReducer
reducer的类型
```ts
const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement", payload: "5" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
    </>
  );
}
```

#### ref
使用ref来获取dom节点
```ts
const divRef = useRef<HTMLDivElement>(null);
```

待续...