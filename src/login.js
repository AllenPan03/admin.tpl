import Vue from 'vue'
import VueResource from 'vue-resource'
import '../static/lib/font-awesome/css/font-awesome.css'
import {set}  from './js/cookieUtil'

Vue.use(VueResource)

new Vue({
  data: {
    name: '',
    info: '',
    pwd: '',
    pwdRepeat: ''
  },
  methods: {
    login(payload) {
      return Vue.http.post('/api/login', payload)
        .then(response => {
          if (response.data.state === 1) {
            const date = new Date(Date.now() + 60000 * 30)
            set('user', this.name, date, '/', window.location.hostname)
            window.location.href = "./index.html"
          } else {
            return Promise.reject(response.data.msg)
          }
        })
    },
    doLogin() {
      if (!this.name.length) return this.info = '请输入合适的用户名'
      if (this.pwd.length < 5) return this.info = '密码长度太短'
      this.login({ name: this.name, pwd: this.pwd })
        .catch(msg => this.info = msg)
    },
    clearInfo() {
      this.info = ''
    }
  },
  watch: {
    name: 'clearInfo',
    pwd: 'clearInfo'
  }
}).$mount('#login')
