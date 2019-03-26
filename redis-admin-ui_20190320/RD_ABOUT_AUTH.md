# About Auth Cookie Seesion eg.

## 简单的权限控制系统

简化的RBAC  
比较完善的权限控制 包括菜单访问  

## axios 发送http请求默认不带cookie
后端放开跨域, axios可以跨域访问  
域名不变端口变也算跨域  
在 main.js添加 axios.defaults.withCredentials = true  
