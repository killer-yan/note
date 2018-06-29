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