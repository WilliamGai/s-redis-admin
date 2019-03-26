/***
 * 拦截器 2019年03月18日21:17:13 
 * @author gaojianming
 * @author gebaoning
 * 
 *  **** how to use? ***
 *  int main.js
 *  ``` js
 *  1. require('./api/httpinterceptor') Suggested
 *  2. import httpinterceptors from './api/httpinterceptor'
 *  ``` 
 *  the solution 1. would be recommend
 *  3. the following way is also 
 *  ``` js
 *  axios.interceptors.request.use(function(){
 *    console.log('here')
 *  });
 *  ```
 */
import axios from 'axios';

axios.interceptors.request.use(function (config) {
        console.log('%c HTTP INTERCEPTORS URL:', 'color:#00FFFF;', location.href);
        console.log('%c HTTP INTERCEPTORS PORT:', 'color:#00FFFF;', location.port);
        console.log('%c HTTP INTERCEPTORS HOST_NAME:', 'color:#00FFFF;', location.hostname);
        console.log('%c HTTP INTERCEPTORS SSO_TOKEN2:', 'color:#00FFFF;', getCookie('ssoToken'));
        console.log('%c HTTP INTERCEPTORS SSO_TOKEN2:', 'color:#00FFFF;', getCookieByName('ssoToken'));
        console.log('%c HTTP INTERCEPTORS CONFIG:', 'color:#FFDEAD;', config);
        
        console.log('%c HTTP INTERCEPTORS SSO_TOKEN3:', 'color:#00FFFF;', document.cookie.length);
        let ssoCookie = getCookieByName('ascookies');

        let ssoObject = eval(ssoCookie);
        console.log('%c HTTP INTERCEPTORS SSO_TOKEN ascookies:', 'color:#00FFFF;', ssoCookie);
        console.log('%c HTTP INTERCEPTORS SSO_TOKEN ascookies jsonObj:', 'color:#00FFFF;', ssoObject);

        if (!ssoObject){
            return config;
        }
        console.log('%c HTTP INTERCEPTORS SSO_TOKEN3:', 'color:#00FFFF;', ssoObject);
        console.log('%c HTTP INTERCEPTORS SSO_TOKEN3:', 'color:#00FFFF;', ssoObject.toString());
        /** as same as config.headers['ssoToken'] = ssoObject[0].v;  */
        for (var i = 0, l = ssoObject.length; i < l; i++) {
            console.log('%c HTTP INTERCEPTORS set ssoToken kv loop:', 'color:#00FFFF;', i, ssoObject[i]);
            if (ssoObject[i]['k'] == 'manageUserToken') {
              config.headers['ssoToken'] = ssoObject[i]['v'];
              console.log('%c HTTP INTERCEPTORS set ssoToken in header:', 'color:#00FFFF;', ssoObject[i]['k']);
            }
        }
        

        //console.log('%c HTTP INTERCEPTORS SSO_TOKEN:', 'color:#00FFFF;', cookies.get('ssoToken'));

        /* let cookie_auth = cookies.get('Authorization')
        let cookie_session = cookies.get('vk_session_id')
        if (!config.headers.hasOwnProperty('Authorization') && cookie_auth) {
            config.headers['Authorization'] = cookie_auth.replace(/\"/g, '')
        }
        if (cookie_session) {
            config.headers['vk-session-id'] = cookie_session
        }*/
        return config
})

axios.interceptors.response.use(
    function (response) {
        console.log('%c HTTP INTERCEPTORS AFTER:', location.port , 'color:#00FFFF;');
        if(response.data.code != 200){
            //window.location.href = location.protocol + '//' + location.hostname + '/account/signupOrLogin'
            let ssoUrl = response.data.data;
            if (ssoUrl) {
                var url = ssoUrl + "?redirect_url=" + window.location.href;
                 window.location.href = url;
                console.log('%c HTTP INTERCEPTORS REDIRECT:', 'color:#FF00FF;', response.data.code);
                console.log('%c HTTP INTERCEPTORS REDIRECT:', 'color:#FF00FF;', url);
            }
        }
        return response
    }, 
    function (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = location.protocol + '//' + location.hostname + '/account/signupOrLogin'
        } else if (error.toString() === 'Error: Network Error') {
            window.console.log('网络开小差啦，请检查网络并重试。')
        }
    // sa.track('h5_http', {'content': error.toString(), 'interface': error.config.url, 'parameters': `params:${JSON.stringify(error.config.params)},data:${JSON.stringify(error.config.data)}` })
    return Promise.reject(error)
})

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if (arr = document.cookie.match(reg))

    return unescape(arr[2]);
  else
    return null;
}
function getCookieByName(name) {
  var cookies = document.cookie;
  var list = cookies.split("; "); // 解析出名/值对列表
  console.log('%c HTTP INTERCEPTORS SSO_TOKEN LENGTH:', 'color:#00FFFF;', list.length);
  for (var i = 0; i < list.length; i++) {
    var arr = list[i].split("="); // 解析出名和值
    console.log('%c HTTP INTERCEPTORS SSO_TOKEN VALUE:', 'color:#00FFFF;', arr);
    if (arr[0] == name)
      return decodeURIComponent(arr[1]); // 对cookie值解码
  }
  return "";
}

export default axios //?
