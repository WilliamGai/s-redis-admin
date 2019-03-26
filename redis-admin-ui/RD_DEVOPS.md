项目自启动
``` js
console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> [Admin UI] Listening at ' + uri + '\n', 'node env is ' + process.env.NODE_ENV)
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})
```