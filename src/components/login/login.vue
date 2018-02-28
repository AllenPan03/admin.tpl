<style lang="scss">
@import "./login.scss";
</style>
<template>
  <section class="login">
    <div class="form" @keyup.enter="doLogin">
      <p class="icon">
        <i class="fa fa-fire fa-2x"></i>
      </p>
      <p class="input">
        <i class="fa fa-user fa-fw"></i>
        <input id="userName"
               type="text"
               name="userName"
               placeholder="用户名"
               v-model.trim="name"
        >
      </p>
      <p class="input">
        <i class="fa fa-key fa-fw"></i>
        <input id="password"
               type="password"
               placeholder="密码"
               v-model.trim="pwd"
        >
      </p>
      <p class="info">{{info}}</p>
      <p>
        <button @click="doLogin()">登陆
        </button>
      </p>
    </div>
  </section>
</template>
<script>
  //import {mapActions} from 'vuex'
  //import {set}  from '../../assets/js/cookieUtil'

  export default{
    data(){
      return {
        name: '',
        pwd: '',
        info: ''
      }
    },
    methods: {
      doLogin(){
        if (!this.name.length) return this.info = '请输入正常的用户名'
        if (!this.pwd.length) return this.info = '请输入正常的密码'

        // this.login({name: this.name, pwd: this.pwd})
        //   .then(() => {
        //     const date = new Date(Date.now() + 60000 * 30)
        //     set('user', this.name, date, '/', window.location.hostname)
        //     this.$router.push({path: '/console'})
        //   })
        //   .catch(msg => this.info = msg)
      },
      clearInfo(){
        this.info = ''
      },
     // ...mapActions(['login'])
    },
    watch: {
      name: 'clearInfo',
      pwd: 'clearInfo'
    }
  }
</script>
