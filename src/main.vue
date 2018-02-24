<style>
    #loading {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 330px;
    text-align: center;
    z-index: 9999;
    }
</style>
<template>
    <div>
          <my-header :uname="uname"></my-header>
          <nav-tree></nav-tree>
          <tab-show></tab-show>
          <modal id="modal" :modal-w="modalProps.modalW">

                <component :is="modalView" :modal-props="modalProps"></component>

          </modal>
          <modal id="msg-alert">
            <alert :msg="alertMsg" :routeName="routeName" :query="query" :refresh="refresh"></alert>
          </modal>
        <!---<div id="loading">
            <img src="./css/img/ajax-loader-6.gif">
        </div>-->
        <div id='loading' style="display:none;">
            <span style=" display: table-cell;  text-align: center; vertical-align: middle;">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiazai"></use>
            </svg>
            正在加载 ...</span>
        </div>
    </div>
</template>

<script>
/*
 * 主页面
 * 事件： 新增一个弹窗， 取消一个弹窗，关闭所有弹窗
 * 注：新增一个弹窗需再为他填充内容，并显示 
 */
import Vue from 'vue'
import navTree from './components/basic/nav-tree/nav-tree.vue'
import tabShow from './components/basic/tab-show/tab-show.vue'
import myHeader from './components/basic/header/header.vue'
import modal from './components/basic/modal/modal.vue'
import alert from './components/basic/alert/alert-msg.vue'

export default {
    data() {
        return {
          // 'modalList': []
          'alertMsg': '', 'modalView': '', 'modalProps': {}, 'uname': ''
        }
    }
    ,components: {'navTree': navTree, 'tabShow': tabShow, 'myHeader': myHeader, 'modal': modal, 'alert': alert}

    ,created () {
        //创建模态关闭某一个的事件
        eventHub.$on('close-modal', this.closeModal)       
        //创建开启某一个模态的事件，包括新增
        eventHub.$on('open-modal', this.openModal)
        //创建关闭所有模态的事件
        eventHub.$on('close-all-modal', this.closeAllModal)
        //打开弹窗
        eventHub.$on('show-alert', this.showAlert)
        //关闭提示弹窗
        eventHub.$on('close-alert', this.closeAlert)
        //显示页面姓名
        eventHub.$on('show-uname', this.showUname)

    }
    ,mounted () {

    }
    ,methods: {

        closeModal: function () {

            this.modalView = ''
            $('#' + 'modal').modal('hide')
            //this.modalList = _list
        }
        //modalObj : {id,content}
        ,openModal: function (modalView, modalProps) {
            this.modalView = modalView
            if (modalProps) {
                this.modalProps = modalProps
            }
            this.$nextTick(function () {
                $('#' + 'modal').modal('show')
            })

        }
        ,closeAllModal: function () {
          //先处理遮罩
          $('.modal').modal('hide');
          //this.modalList = []
        }
        ,showAlert (msg,refresh,routeName,query) {
            // var alertDom = new Vue({
            //   el: '#content-msg-alert'
            //   ,render: h => h(alert, {props: {'msg': msg}})
            // })
            //$('#content-msg-alert').html(alertDom.$el); 
            //alert(this.$router.hash)
            this.alertMsg = msg
            this.refresh = refresh
            this.routeName = routeName
            this.query = query
            $('#msg-alert').modal('show');       
        }
        ,closeAlert () {
            $('#msg-alert').modal('hide');
        }
        ,showUname (uname) {

            this.uname = uname
        }
    }
}
</script>

