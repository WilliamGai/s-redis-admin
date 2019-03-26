# JS 相关

JSON.parse(user);
和eval(val)转json有什么不同？

## json和sessionStorage

sessionStorage.setItem('user', JSON.stringify(user));
var user = sessionStorage.getItem('user');
user = JSON.parse(user);
sessionStorage.removeItem('user');
## localStorage
localStorage.opid