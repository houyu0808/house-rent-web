import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import {store} from './store'

const app = createApp(App)
app.use(elementPlus)


app.use(router)
app.use(store)
app.mount('#app')
