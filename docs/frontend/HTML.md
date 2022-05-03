# HTML

## 语义化
一般情况下使用div+css就可以实现静态页面了，但是这样写会使文档结构不够清晰，不利于开发和维护。结构化也是为了代码的可读性，提升网页质量。

语义化，顾名思义，就是你写的HTML结构，是用相对应的有一定语义的英文字母（标签）表示的，标记的，因为HTML本身就是标记语言。不仅对自己来说，容易阅读，书写。别人看你的代码和结构也容易理解，甚至对一些不是做网页开发的人来说，也容易阅读。那么，我们以后再开发的过程中，一定要注意了，尽量使用官方的有语义的标签，不要再使用一堆无意义的标签去堆你的结构。

## 语义化的目的
- 在没有css的情况下，页面也能呈现出很好的内容结构。
- 用户体验，例如title、alt等用于解释名词或者解释图片信息的标签尽量填写有含义的词语
label标签的活用等。
- 有利于SEO，和搜索引擎建立良好的沟通，有助于爬虫爬取更多的有效信息。爬虫依赖于标签来确定上下文和各个关键字的权重。
- 方便于团队开发和维护，语义化更具有可读性遵循W3C标准的团队都遵循这个标准，可以减少差异化。

## HTML5新增特性
- 增加了语义标签
> header、footer、nav、section文档中的一节、article页面的独立内容区域、aside页面侧边栏内容、detailes文档某个细节部分、summary包含details元素的标题、dialog对话框。
- 增强表单
> 提供input更多输入类型，如color、date、email、number、range、tel、week、url、search等；新的表单元素datalist(其id属性与input的list属性绑定，实现选项列表输入)；新表单元素keygen、output等；新增placehoder、required、pattern、min、max、step、height、width、autofocus、multiple属性。
- 提供audio、video标签
- 新增canvas容器标签，结合js绘制图形、路径、文本等。

## 其他结构元素
- HTML5节元素标签包括body article nav aside section header footer hgroup ，还有h1-h6和address。
- address代表区块容器，必须是作为联系信息出现，邮编地址、邮件地址等等,一般出现在footer。demo
- h1-h6因为hgroup，section和article的出现，h1-h6定义也发生了变化，允许一张页面出现多个h1。

## SEO优化
- h1标签页面只能出现一次，权重最高。
- 减少div标签的使用，尽量用语义化强的标签。
- 注重meta标签的使用，如那么属性设置description、keywords等，对搜索引擎有帮组。
- 注重a标签的img标签的链接和图片说明。
- 减少http请求次数，合理设置http缓存

HTML5
> `<!DOCTYPE html>`

HTML4.01有个严格模式和传统模式。严格模式不包括展示性的和弃用的元素，传统模式包括。

- 重排Reflow

  DOM结构中的各个元素都有自己的盒子（模型），这些都需要游览器根据各种样式来计算并根据计算结果将元素放到它该出现的位置，这个过程称之为reflow。

**触发REFlow**

    当你增加、删除DOM节点是，会导致Reflow或Repaint。

    当你移动DOM的位置，或动画时。

    当你修改CSS样式。

    当你Resize窗口的时候（移动端没有这个问题），或滚动的时候。

    当你修改网页的默认字体。

- 重绘Repaint

当各种盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来后，游览器把这些元素都按照各自的铁行绘制了一遍，于是页面的内容出现了，这个过程称之为repaint。

**触发Repaint**

DOM改动 ， CSS改动。


## 页面

- 提升页面性能

1. 资源压缩合并，减少HTTP请求。
2. 非核心代码异步加载 -> 异步加载的方式 -> 异步加载的区别。
3. 利用浏览器缓存 -> 缓存的分类 -> 缓存的原理
4. 使用CDN
5. 预解析DNS
  > https开头的有一些是默认关闭预解析的，强制打开a标签的预解析。
  >
  > `<meta http-equiv="x-dns-prefetch-contol" content="on">`
  >
  > `<link rel="dns-prefetch" href="//host_name_to_prefetch.com">`