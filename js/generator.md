## generator

> es6提供一种异步编程的解决方案，语法行为与传统函数完全不同。
形式上，generator函数是一个普通函数，但有两个特征：一是：function关键字与函数名之间有一个星号；二是：函数体内部使用yield表达式，定义不同的内部状态。

> generator函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用fenerator函数后，该函数并不执行，返回的也不是函数运行的结果，而是一个指向内部状态的指针对象，也就是遍历器对象Iterator Object。

> 必须调用遍历器对象的next方法，使得指针移向下一个状态；每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式或return语句为止。

> generator函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

- 总结：调用generator函数，返回一个遍历器对象，代表generator函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值。done属性是一个布尔值，表示是否遍历结束。

### yield表达式
