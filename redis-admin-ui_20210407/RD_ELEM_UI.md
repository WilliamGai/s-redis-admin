## 添加element-ui
```
npm i element-ui -S

package.json变为
  "dependencies": {
    "element-ui": "^2.6.1",
    "vue": "^2.5.2",
    "vue-router": "^3.0.1"
  }
main.js文件添加

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// Vue.use(rem)

HelloWorld.vue添加
</ul>
    <TestLayout/>
  </div>
</template>

<script>
//import TestLayout from './components/TestLayout'  XXX
//import TestLayout from './TestLayout.vue'
import TestLayout from './TestLayout'


export default {
  name: 'HelloWorld',
  components: {
    TestLayout
  },
```