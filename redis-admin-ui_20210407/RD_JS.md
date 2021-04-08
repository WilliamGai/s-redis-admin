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

## this

``` js
getUnfinishedClasses: function () {
				console.log('Unfinish.vue getUnfinishedClasses called: ', this)
				let para = {
					days: this.filters.days
				};
				this.loading = true;
				//let testObj = this.getUnfinishedClassesByApi(para, function(res) {this.loading = false});	这种写法 this将指向整个dom	
				let testObj = this.getUnfinishedClassesByApi(para, (res) => {
					this.onlineClasses = res.data.data;
					this.loading = false;
				});			
			}
```
## js 将数组拼为字符串