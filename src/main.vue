<style lang="scss">
@import "./assets/css/main.scss";
</style>
<template>
    <div>
        <!-- 初始化页面 start -->
        <div id="setup" class="loginBox" v-if="!initialized"> 
            <div class="form">
                <p class="logo">
                    <i class="fa fa-fire fa-2x"></i>
                </p>
                <p>
                    SETUP
                </p>
                <p class="input">
                    <i class="fa fa-user fa-fw"></i>
                    <input type="text" placeholder="输入用户名" v-model.trim="name">
                </p>
                <p class="input">
                    <i class="fa fa-key fa-fw"></i>
                    <input type="password" placeholder="输入密码" v-model.trim="pwd">
                </p>
                <p class="input">
                    <i class="fa fa-key fa-fw"></i>
                    <input type="password" placeholder="确认输入" v-model.trim="pwdRepeat">
                </p>
                <p class="info">{{info}}</p>
                <p>
                    <button @click="submit()">提交</button>
                </p>
            </div>
        </div>
        <!-- 初始化页面 end -->
        <!-- 登录页面 start -->
        <div id="login" class="loginBox" v-if="initialized&&(!isLogin)">
            <div class="form" @keyup.enter="doLogin">
            <p class="logo">
                <i class="fa fa-fire fa-2x"></i>
            </p>
            <p>
                Login
            </p>
            <p class="input">
                <i class="fa fa-user fa-fw"></i>
                <input type="text" placeholder="输入用户名" v-model.trim="name">
            </p>
            <p class="input">
                <i class="fa fa-key fa-fw"></i>
                <input type="password" placeholder="输入密码" v-model.trim="pwd">
            </p>
            <p class="info">{{info}}</p>
            <p>
                <button @click="doLogin()">登陆</button>
            </p>
            </div>
        </div>
        <!-- 登录页面 end -->
        <div id="main" v-if="isLogin">
          <my-header :uname="uname"></my-header>
          <nav-tree></nav-tree>
          <tab-show></tab-show>
          <modal id="modal" :modal-w="modalProps.modalW">
                <component :is="modalView" :modal-props="modalProps"></component>
          </modal>
          <modal id="msg-alert">
            <alert :msg="alertMsg" :routeName="routeName" :query="query" :refresh="refresh"></alert>
          </modal>
          <div id='loading' style="display:none;">
            <span style=" display: table-cell;  text-align: center; vertical-align: middle;">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiazai"></use>
                </svg>
                正在加载 ...
            </span>
          </div>
        </div>
    </div>
</template>
<script>
/*
 * 主页面
 * 事件： 新增一个弹窗， 取消一个弹窗，关闭所有弹窗
 * 注：新增一个弹窗需再为他填充内容，并显示 
 */
import Vue from "vue";
import action from "./action/interface.js";
import mixins from "./components/mixin.js";
import navTree from "./components/basic/nav-tree/nav-tree.vue";
import tabShow from "./components/basic/tab-show/tab-show.vue";
import myHeader from "./components/basic/header/header.vue";
import modal from "./components/basic/modal/modal.vue";
import alert from "./components/basic/alert/alert-msg.vue";
import { set, get, unset } from "./js/cookieUtil";

export default {
  data() {
    return {
      // 'modalList': []
      alertMsg: "",
      modalView: "",
      modalProps: {},
      uname: "",
      isLogin: true,
      name: "",
      info: "",
      pwd: "",
      pwdRepeat: "",
      initialized: true
    };
  },
  components: {
    navTree: navTree,
    tabShow: tabShow,
    myHeader: myHeader,
    modal: modal,
    alert: alert
  },

  created() {
    //创建模态关闭某一个的事件
    eventHub.$on("close-modal", this.closeModal);
    //创建开启某一个模态的事件，包括新增
    eventHub.$on("open-modal", this.openModal);
    //创建关闭所有模态的事件
    eventHub.$on("close-all-modal", this.closeAllModal);
    //打开弹窗
    eventHub.$on("show-alert", this.showAlert);
    //关闭提示弹窗
    eventHub.$on("close-alert", this.closeAlert);
    //显示页面姓名
    eventHub.$on("show-uname", this.showUname);
    let url = action.rootPath + action.interface.initialized;
    this.send(url, {}, e => {
      if (e.code == 0) {
        this.initialized = true;
      } else {
        this.initialized = false;
      }
    });
    const user = get("user");
    this.uname = user || '';
    if (!user) this.isLogin = false;
    //if (user && !this.user.name) this.SET_USER({ name: user, pwd: "" });
  },
  mounted() {},
  mixins: [mixins],
  methods: {
    submit() {
      let setupUrl = action.rootPath + action.interface.setup;
      if (!this.name.length) return (this.info = "请输入合适的用户名");
      if (this.pwd.length < 5) return (this.info = "密码长度太短");
      if (this.pwd !== this.pwdRepeat)
        return (this.info = "两次输入的密码不一致");
      this.post(setupUrl, { name: this.name, pwd: this.pwd }, e => {
        this.info = "创建成功, 即将跳转到登陆...";
        setTimeout(() => window.location.reload(), 1500);
      });
    },
    //登录
    doLogin() {
      let loginUrl = action.rootPath + action.interface.login;
      if (!this.name.length) return (this.info = "请输入合适的用户名");
      if (this.pwd.length < 5) return (this.info = "密码长度太短");
      this.post(loginUrl, { name: this.name, pwd: this.pwd }, e => {
        if (e.data === 0) {
          const date = new Date(Date.now() + 60000 * 30);
          set("user", this.name, date, "/", window.location.hostname);
          this.info = "登录成功";
          this.isLogin = true;
          this.uname = this.name || '';
          //setTimeout(() => window.location.reload(), 1500);
        } else {
          this.info = e.msg;
        }
      });
    },

    closeModal: function() {
      this.modalView = "";
      $("#" + "modal").modal("hide");
      //this.modalList = _list
    },
    //modalObj : {id,content}
    openModal: function(modalView, modalProps) {
      this.modalView = modalView;
      if (modalProps) {
        this.modalProps = modalProps;
      }
      this.$nextTick(function() {
        $("#" + "modal").modal("show");
      });
    },
    closeAllModal: function() {
      //先处理遮罩
      $(".modal").modal("hide");
      //this.modalList = []
    },
    showAlert(msg, refresh, routeName, query) {
      this.alertMsg = msg;
      this.refresh = refresh;
      this.routeName = routeName;
      this.query = query;
      $("#msg-alert").modal("show");
    },
    closeAlert() {
      $("#msg-alert").modal("hide");
    },
    showUname(uname) {
      this.uname = uname;
    }
  }
};
</script>

