# 每次F5刷新页面报如下错误

``` js
isURLSameOrigin.js?1870:57 Uncaught (in promise) TypeError: Cannot read property 'protocol' of undefined
    at isURLSameOrigin (isURLSameOrigin.js?1870:57)
    at dispatchXhrRequest (xhr.js?ec6c:109)
    at new Promise (<anonymous>)
    at xhrAdapter (xhr.js?ec6c:12)
    at dispatchRequest (dispatchRequest.js?c4bb:59)
```
解决方法:  
main.js里注释掉
``` js
Vue.use(axios)
```

# 访问本地域名 Invalid Host header  2019年03月18日16:16:36
```
修改 build目录下的webpack.base.config
添加
devServer: { disableHostCheck: true, }
```