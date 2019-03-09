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