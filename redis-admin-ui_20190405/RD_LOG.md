# 2019年03月09日 从头自建项目
## 安装npm eslink
npm install -g eslint

$ eslint --init
## 删除 npm eslink
192:redis-admin bao$ sudo npm uninstall -g eslint
Password:
removed 117 packages in 0.858s

## 删除 vue
npm uninstall -g vue

## 如果报错 'Unexpected end of JSON input while parsing near '...ll":"https://registry'
 npm cache clean --force

## 没有项目的写权限
sudo chmod -R 777   redis-admin-ui

## 安装elem-ui
npm i element-ui -S

# npm 安装
## 安装 axios
npm install axios -S


## 安装font-awesome图标

``` shell
BAOdeMacBook-Pro:redis-admin-ui bao$ npm install font-awesome --save
npm WARN ajv-keywords@3.4.0 requires a peer of ajv@^6.9.1 but none is installed. You must install peer dependencies yourself.

+ font-awesome@4.7.0
added 1 package from 5 contributors and audited 10673 packages in 8.701s
found 3 vulnerabilities (1 low, 1 moderate, 1 high)
  run `npm audit fix` to fix them, or `npm audit` for details
```

## 安装 echart
npm install echart -S

``` shell
bogon:redis-admin-ui bao$ npm install echart -S
npm WARN ajv-keywords@3.4.0 requires a peer of ajv@^6.9.1 but none is installed. You must install peer dependencies you
rself.

+ echart@0.1.3
added 29 packages from 21 contributors and audited 10740 packages in 11.661s
found 3 vulnerabilities (1 low, 1 moderate, 1 high)
  run `npm audit fix` to fix them, or `npm audit` for details
```
- 但是写VUE的时候 报错 提示 npm install --save echarts 
```
 ERROR  Failed to compile with 1 errors                                                                                                 23:12:49

This dependency was not found:

* echarts in ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/view/nav1/Echarts.vu
e

To install it, you can run: npm install --save echarts 
```
