## reduce()
> reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
> 就是将数组中的每个值从右向左依次进行操作的函数。怎么操作在参数function中自己定义。
> 注意: reduce() 对于空数组是不会执行回调函数的。
#### 语法
```
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```
#### 参数
- function(total,currentValue,index,arr)：必须，total为初始值/计算后每次累加的值；currentValue为当前元素。
- initialValue ：可选，传递给函数的初始值