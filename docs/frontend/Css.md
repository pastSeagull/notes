# CSS

## CSS选择器
- 标签选择器
- 类选择器 （ . ）(通过设置元素class属性，文档中多个元素可以拥有同一个类名。)
- id选择器 ( # ) (设置元素的id属性，每个id在文档中必须是唯一的)
- 关系选择器
```
 A E (元素A的任一子元素E，后代节点A的字节点，子节点的子节点，以此类推)
 A > E (元素A的任一字元素E，就是后代直系后代)
 E:first-child（任一是其父母节点的第一个子节点元素）
 B + E （元素B的任一下一个元素E）
 B ~ E （B元素后面拥有共同父元素的兄弟元素E）
 ```
 - 伪类选择器 (是加在选择器后面的用来指向元素状体的关键字,  :hover等等)
 ## CSS三大特性
 - 继承性  (给父元素设置一些属性，子元素也可以使用)
 > 并不是所有属性都可以继承，只有color/font/text-/line-开头的属性才可以继承。只要是后代都可以基础。
 >
 >a标签的文字颜色和下划线不能被继承，h标签的文字大小是不能继承的。
 - 层叠性 （多个选择器选中同一个标签，设置同一个属性时，是否生效由优先级判断）
 - 优先级
 > !important 声明最高  然后行内样式 > 内部样式 > 外部样式
 >
 >link链入外部样式和style内部样式优先级，取决于先后顺序。
 > 样式表中优先级 Id选择器 > class选择器 > 标签选择器 > 通配符
 >
 >!important > 内联样式 > ID选择器 > class选择器 > 标签选择器 > 通配符（*） > 浏览器默认样式 > 继承样式

 ## 盒模型
 盒模型（Box MOdel）,包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个元素。

游览器默认是`content-box`
 - IE模型和标准盒模型唯一的区别就是内容计算方式的不同
 >IE模型元素宽度width = content + padding + border
 >
 >标准模型元素宽度width = content(width)

 通过css3新增属性`box-sizing: content-box | border-box`分别设置盒模型为标准（content-box）和IE模型（border-box）游览器默认是`content-box`

 - js获取盒模型对应的宽高
 >`dom.style.widht/height`只能取到行内样式的宽和高，style标签中和link外链样式取不到。
 >
 >`dom.currentStyle.widht/height`取到的是最终渲染后的，但是只有IE支持此属性。
 >
 >`window.getComputedStyle(dom).widht/height`同上一个，但是多游览器支持，IE9以上支持。
 >
 >`dom.getBOundingClientRect().widht/height`同上一个，还可以取到相对于视窗上下左右的距离。

 ## 外边距重叠
当两个垂直外边距相遇时，他们形成一个外边距，合并后外边距高度等于两个合并的外边距高度中较大者。**注意**：只有普通文档流中块框的垂直外边距才会发生外边距合并，行内框、浮动框或者绝对定位之间的外边距不会合并。

## BFC
这里父元素section的高度是100px，但是我们给section设置了`overflow:hidden`后高度就变成了110px，这里是给父元素创建了BFC。
```html
        <style>
            * {
                margin: 0;
                padding: 0;
            }
            #sec {
                background: #f00;
            }
            .child {
                height: 100px;
                margin-top: 10px;
                background: yellow;
            }
        </style>
    <section id="sec">
        <article class="child"></article>
    </section>
```
- BFC（Block Formatting Context）：块级格式化上下文。
> BFC决定了元素如何对其内容进行定位，和其他元素的关系，相互关系。相当于BFC提供了一个环境，HTML元素在这个环境按照一定的规则进行布局，一个环境中的元素不会影响到其他环境的布局。

- BFC渲染规则
>BFC元素垂直方向的边距会发生重叠，属于不同BFC外边距不会发生重叠。
>
>BFC的区域不会与浮动元素的布局重叠。
>
>BFC元素是一个独立的容器，外边的元素不会影响里面的元素。里面也不会影响外面的。
>
>计算BFC高度的时候，浮动元素也会参与计算（清除浮动）。

- 如何创建BFC
>overflow不为visible。
>
>float的值不为none。
>
>position的值不为static  or  relative
>
>display设置为inline-blocks, table,table-cell, table-caption, flex, inline-flex。

## 屏幕适配以及页面自动调整
- 允许网页宽度自动调整
> `<meta name="viewport" content="width=device-width,initial-scale=1" />`
- 宽度百分比
- 相对字体rem/em
- 流动布局，利用float  or  display：fixed等
- 使用css media模块
- 图片自适应，max-widht/min-widht。

## 布局
- 传统布局（借助浮动，定位等）
- flex布局
- 百分比布局
- grid布局（display：grid），本质上还是百分比布局。

- 元素的分类
> 从元素布局特性来分，主要可以分为三类元素，block-level（块级）元素、inline-level（行内级）元素和inline-block-level（行内块级）元素。
- 块级元素

块级元素独占一行（width默认为100%,height为0）

可以设置任何尺寸相关的属性（width、padding、margin、border）

display属性取block、table、flex、grid、list-item等值独占一行显示
> 块级元素有div , p , form, ul, li , ol, dl, form, address, fieldset, hr, menu, table, address, h1~h6, article, aside, audio, blockquote, canvas, dd, dl, fieldset, figcaption, figure, footer, header, hgroup, hr, noscript, ol, output, p, pre, section, table, tfoot, bideo。

- 行内元素
> 行内元素有：b, big, i, small, tt
abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var
a, bdo, br, img, map, object, q, script, span, sub, sup
button, input, label, select, textarea

### 三栏布局

- 浮动

兼容性比较好，但是要清除浮动。（高度撑开，沿着线排序，创建BFC）
```html
<section class="section">
    <article class="box">
      <div class="left"></div>
      <div class="right"></div>
      <div class="mid"></div>
    </article>
  </section>

  <style>
  .section .box div {
    min-height: 100px;
  }

  .section .box .left {
    width: 300px;
    float: left;
    background-color: blue;
  }

  .section .box .right {
    width: 300px;
    float: right;
    background-color: red;
  }

  .section .box .mid {
    background-color: black;
  }
</style>
```

- 绝对定位

比较快速直观，但是已经脱离文档流了，你下面的子元素也要脱离文档流，可使用性比较差。
```html
<style>
  .section .box div {
    min-height: 100px;
  }

  .section .box {
    position: relative;
  }

  .section .box .left {
    width: 300px;
    position: absolute;
    left: 0;
    background-color: blue;
  }

  .section .box .right {
    width: 300px;
    position: absolute;
    right: 0;
    background-color: red;
  }

  .section .box .mid {
    background-color: black;
  }
</style>
```
- flex布局

css3引入的，比较容易上手，但是游览器兼容性比较差（IE9）（高度未知可以使用）
```html
<style>
  .section .box div {
    min-height: 100px;
  }

  .section .box {
    display: flex;
  }

  .section .box .left {
    width: 300px;
    background-color: blue;
  }

  .section .box .right {
    width: 300px;
    background-color: red;
  }

  .section .box .mid {
    flex: 1;
    background-color: black;
  }
</style>
```


- 表格布局

兼容性很好，但是当其中一个单元格高度超出的时候，两侧单元格也是会跟着一起变高的。（高度未知可以使用）
```html
<style>
  .section .box div {
    display: table-cell;
  }

  .section .box {
    height: 100px;
    width: 100%;
    display: table;
  }

  .section .box .left {
    width: 300px;
    background-color: blue;
  }

  .section .box .right {
    width: 300px;
    background-color: red;
  }

  .section .box .mid {
    background-color: black;
  }
</style>
```
- 网格布局

```html
<style>
  .section .box {
    display: grid;
    grid-template-rows: 100px;
    grid-template-columns: 300px auto 300px;
  }

  .section .box .left {
    background-color: blue;
  }

  .section .box .right {
    background-color: red;
  }

  .section .box .mid {
    background-color: black;
  }
</style>
```