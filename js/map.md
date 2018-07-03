## map()
### 参数：
value数组中的当前项,index当前项的索引,array原始数组；


### 语法：
```
    arr[].map(function (value, index, array) {
        //do something
        return XXX
    })
```

### 注意：
- 匿名函数中的this都是指Window。
- 只能遍历数组。
- 有返回值，可以return 出来。
- 不改变原数组。