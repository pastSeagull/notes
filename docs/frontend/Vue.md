# vue

```javascript
<div id='say'>
  <p>{{say}}<p>
</div>

var vue = new Vue({
  el: '#say',
  data: {
    say: 'Hello, vue'
  }
})
```
## 指令

  - v-text

  - v-show

  - v-if

  - v-else

  - v-else-if

  - v-for

  - v-on 缩写 @

  - v-bind 缩写 ：

  - v-model

  - v-slot

  - v-pre

  - v-cloak

  - v-once

```javascript
<div id='say'>
  <p>{{say}}<p>
</div>

var vue = new Vue({
  el: '#say',
  data: {
    say: 'Hello, vue',
    html: '<p>Hello, vue</p>'
  }
})

// v-text
<p v-text="say"></p>
<p>{{say}}</p>

// v-html,更新元素的innerHTML
<div v-html="html"></div>

```

## 生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestory
- destoryed

## vuex

```javascript
const store = new Vuex.Store({
    state: {
        count: 0
    },

    getters: {
        countPlus (state) {
          return state.count + 1
        }
    },

    mutations: {
        increment (state, payload) {
          return state.count += payload
        }
    }
})
new Vue({
    el: '.app',
    store,
    computed: {
        count: function() {
            return this.$store.state.count
        }
    },
    methods: {
        increment () {
          return $state.commit('increment', 10)
        }
    },
    template: `
        <div>
            {{ count }}
            <button @click='increment'>点我</button>
        </div>
    `
})
```

## Router

### 动态路由匹配

```javascript
{
  path: '/User/:id',
  name: 'User',
  components: User
}

// User   $route.params使用参数
{{ $route.params.id}}
```

### 嵌套路由

`router-view`中在嵌套`router-view`
```javascript
{
  path: '/User/:id',
  components: User,
  children: [
    {
      path: 'profiles',
      name: 'User',
      components: Profiles
    }
  ]
}
```

### 编程式导航

- 除了使用`<router-link>`来创建a标签来定义导航链接，还可以通过`this.$router.push`
```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

### 命名路由

```JavaScript
export default new Router({
  touter: [
    {
      path: '/User/:id',
      name: 'User',
      components: User
    }
  ]
})

// 
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
// router.push()

router.push({ name: 'user', params: { userId: 123 }})
```

### 命名视图

- 同级展示多个视图
```JavaScript
{
  path: '/User/:id',
  name: 'User',
  components: {
    default: Home,
      User,
      Profile
  }
}

//
<router-view></router-view>
<router-view name="User"></router-view>
<router-view name="Profile"></router-view>
```

### 重定向
```javascript
{
  path: '/User/:id',
  name: 'User',
  redirect: '/Users',
  components: {
    default: Home,
      User,
      Profile
  }
}
// 也可以是一个命令路由
redirect: {name: 'foo'}
// 方法
redirect: to => {}
```
### History模式

vue-router默认是hash模式
> https://www.google.com.hk/#/imghp

```javascript
// https://www.google.com.hk/imghp
export default new Router({
  mode: 'history',
  routes: []
}) 
// 需要后台配置,如果后台没有正确的配置，当用户在浏览器直接访问 https://www.google.com.hk/imghp 就会返回 404
```
### 导航守卫


## Vue3和2的差异

### 路由
首先路由`hash`和`history`
```js
// Vue2
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})

// Vue3
const router = createRouter({
  history: createWebHistory(),
  routes
})
```
### Vuex
```js
import { createStore } from 'vuex'

const defaultState = {
  count: 0
}

export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState) {
      state.count++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count
    }
  }
})
```
