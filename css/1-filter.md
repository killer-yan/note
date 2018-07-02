# filter
> css滤镜，提供图形特效。

> css标准中已有一些函数实现一些特效，也可用svg提供一个复合滤镜（通过一个url链接到svg滤镜元素）。

## 语法：
```
//普通滤镜
filter: filter-function()  |  none

//引用svg
filter: url(svg-url#element-id)
```

## 函数
- url( )
> url接受一个XML文件，该文件设置一个svg滤镜，并且可以包含一个锚点制定一个具体的滤镜。
```
filter:url(resources.svg#a1)
```

- blur( radius )
> 设置高斯模糊，参数radius设定高斯函数的标准差，或者是屏幕上以多少像素融在一起，值越大越模糊。没有设定值，默认为0。接受css长度值（px等），不接受百分比。
```
filter:blur(5px)

<svg height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="svgBlur" x="-5%" y="-5%" width="110%" height="110%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
  </filter>
</svg>
```
- brightness( )
> 设置亮度，应用一种线性乘法。

> 值为0%，全黑；值为100%，无变化。超过100%会更亮，没有设定值，默认为1。
```
filter : brightness(0.5)

<svg height = '0' xmlns = 'http://www.w3.org/2000/svg'>
   <filter id = 'brightness'>
        <feComponentTransfer>
            <feFuncR type = 'linear' slope ='[amount]'>
            <feFuncG type = 'linear' slope ='[amount]'>
            <feFuncB type = 'linear' slope ='[amount]'>
        </feComponentTransfer>
    </filter>
</svg>        
```

- contrast( )
> 调整图片对比度。 值为0%，全黑；值为100%，图像不变；超过100%，运用更低的对比，没有设定值，默认为1。
```
filter:contrast(200%)

<svg height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="contrast">
    <feComponentTransfer>
      <feFuncR type="linear" slope="[amount]" intercept="-(0.5 * [amount]) + 0.5"/>
      <feFuncG type="linear" slope="[amount]" intercept="-(0.5 * [amount]) + 0.5"/>
      <feFuncB type="linear" slope="[amount]" intercept="-(0.5 * [amount]) + 0.5"/>
    </feComponentTransfer>
  </filter>
</svg>
```

- drop-shadow( )
> 设置阴影效果。效果与box-shadow相似。
```
// 语法：drop-shadow(offset-x offset-y blur-raduis spread-radius color )
// offset-x/offset-y (必填)   
// blur-radius/spread-radius/color (选填)
// 注：blur-radius不允许负值，未设定默认为0
// 注：webkit及一些浏览器不支持spread-radius,加上也不会渲染
// 注：color未设定时，依浏览器而定。

filter : drop-shadow(16px 16px 10px black)

<svg height="0" xmlns="http://www.w3.org/2000/svg">
 <filter id="drop-shadow">
    <feGaussianBlur in="SourceAlpha" stdDeviation="[radius]"/>
    <feOffset dx="[offset-x]" dy="[offset-y]" result="offsetblur"/>
    <feFlood flood-color="[color]"/>
    <feComposite in2="offsetblur" operator="in"/>
    <feMerge>
      <feMergeNode/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</svg>
```

- grayscale( )
> 转化为灰度图像。值为100%，完全为灰度图像；0%无变化；未设置默认为0
```
filter : grayscale(100%)
```

- hue-rotate( )
> 应用色相旋转。默认值为0deg；没有最大值，但是超过360deg相当于又绕一圈。
```
filter : hue-rotate(90deg)
```
- invert( )
> 反转输入图像。（CT）
```
filter : invert(100%)
```

- opacity( )
> 转化透明程度。0%完全透明，100%无变化。未设置默认为1.
```
filter : opcity(50%)
```
- saturate( )
>转换图像饱和度。0%完全不饱和，100%无变化，可超过100%，未设置默认为1
```
filter : saturate(200%)
```
- sepia( )
> 转换为深褐色。
```
filter : sepia(100%)
```
## 复合函数
> 可以组合任意数量的函数来控制渲染。
```
filter : contrast(175%) brightness(3%)
```