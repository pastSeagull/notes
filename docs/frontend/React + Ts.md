# React + Ts
> 主要是用ts的一些坑，还有一些类型

## 组件
- 函数式组件
```js
export type Props = {
    name: string;
    age: number;
}
const App: React.FC<Props> = (props) => {}
```
- 类组件
```js
class App extends React.Component<Props, State> {}
```
## Hooks
> 可以用泛型或者自动推断
```js
const [state, setState] = useState('') // 自动推断string
const [state, setState] = useState<string>('') // string | undefined
```

## redux
