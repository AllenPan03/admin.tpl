<style lang="scss">
@import "./header.scss";
</style>
<template>
    <div class="header">
        <div class="pull-left">
            <span class="nav-control" @click="toggleNav">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="iconName"></use>
                </svg>
            </span>
            <div class="header-icon">
                <svg class="icon" aria-hidden="true">
                    <!-- <use xlink:href="#icon-wei"></use> -->
                </svg>
            </div>
            <span class="sys-name">TPL后台模板</span>
        </div>
        <div class="pull-right">
            <img src="../../../images/face.png"/>
            <span>{{uname}}</span>
            <span><a href="javascript:;" @click="logout">退出</a></span>
        </div>  
    </div>
</template>
<script>
/*
 * 页头部分　
 * params: {uname}
 */
import { set, get, unset } from "../../../js/cookieUtil";
export default {
  props: ["uname"],
  data() {
    return { outUrl: "", flag: true, iconName: "#icon-daohangshouqi" };
  },
  methods: {
    toggleNav() {
      eventHub.$emit("toggle-nav");
      eventHub.$emit("toggle-tab");
      this.flag = !this.flag;
      if (this.flag) {
        this.iconName = "#icon-daohangshouqi";
      } else {
        this.iconName = "#icon-daohangzhankai";
      }
    },
    //退出
    logout() {
      unset("user", "/", window.location.hostname);
      //this.SET_USER({ name: "", pwd: "" });
      window.location.reload();
    }
  },
  created() {
  }
};
</script>