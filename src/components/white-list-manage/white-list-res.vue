<template>
    <div class="white-list">
        <form-group>
            <!--<name-condition slot="input" q-name="uname" v-model="uname"></name-condition>-->
            <mobile-condition slot="input" q-name="mobile" v-model="mobile"></mobile-condition>
            <query-btn-group slot="btn"></query-btn-group>
        </form-group>
        <div class="clearfix">
            <a v-if="showBtn('客户管理','新增')" type="button" class="btn btn-default btn-outline x-space" @click="addWhitelist">新增客户</a>
            <a v-if="showBtn('客户管理','操作历史')" type="button" class="btn btn-default btn-outline x-space" @click="goHistory">操作历史</a>
            <a v-if="showBtn('客户管理','批量导入')" type="button" class="btn btn-sm btn-default btn-outline x-space" @click="addExcel">批量导入</a>
            <a v-if="showBtn('客户管理','批量移除')" type="button" class="btn btn-sm btn-default btn-outline x-space"  @click="removeExcel">批量移除</a>
            <a v-if="showBtn('客户管理','批量修改额度')" type="button" class="btn btn-sm btn-default btn-outline" @click="editCredit">批量修改额度</a>
        </div>
        <div class="x-space-top">
          <table class="table table-bordered ">
            <thead>
            <tr>
              <th>客户姓名</th>
              <th>身份证号码</th>
              <th>电话号码</th>
              <th>总额度（元）</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in reDataList">
                  <td>{{item.uname}}</td>
                  <td>{{item.idcard}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{fMoney(item.creditmoney)}}</td>
                  <td>
                    <a v-if="showBtn('客户管理','更新客户')" href="javascript:;" @click="updateWhitelist(item.id)" :class="updateWhitelistClass" >更新客户</a> |
                    <a v-if="showBtn('客户管理','移除客户')" href="javascript:;" @click="removeWhitelist(item.id)" :class="removeWhitelistClass" >移除客户</a>
                  </td>
                </tr>
            </tbody>
          </table>
          <!--暂无数据 start-->
            <div class="noData">
                {{errorInfo}}
            </div>
          <!--暂无数据 end-->
    </div>
    <page :page-info="pageInfo" :total="total"></page>
    </div>

</template>
<script>
/*
 * 客户管理页面
 */
import action from '../../action/interface.js' 
import mixins from '../mixin.js'
import Vue from 'vue'

import queryBtnGroup from '../query-btn-group/query-btn-group.vue'
import nameCondition from '../form-group/name-condition.vue'
import mobileCondition from '../form-group/mobile-condition.vue'
import formGroup from '../form-group/form-group.vue'
import page from '../basic/page/page.vue'

var pagesize = 8
export default {
    data () {
        //uidList: 保存选择的用户ID 
        return {'uname': '', 'mobile': '', 'pageNum': 1, 'total': 0, 'uidList': [], 'reDataList': [], 'errorInfo': '','ssoId':''}
    }
    ,computed: {
        //分页用
        'pageInfo': function () {
            return {'pageSize': pagesize, 'currentpage': this.pageNum}
        }
        ,'qParams': function () {
           let _offset = this.cptOffset(this.pageNum, pagesize)
            return {'uname': this.uname,'mobile': this.mobile, 'offset': _offset, 'pagesize': pagesize}
        }
        ,'url': function () { //请求地址
            return action.rootPath + action.interface.whiteQueryRestrict
        }
    }
    ,components: {queryBtnGroup, nameCondition, mobileCondition, formGroup, page}
    ,mixins: [mixins]
    ,created () {
        this.doQuery()
    }
    ,methods: {
        //新增客户
        addWhitelist () {
            eventHub.$emit('open-modal', addWhitelist);
            //eventHub.$emit('show-alert', 'test');
        }
        //移除名单
        ,removeWhitelist (id) {
            eventHub.$emit('open-modal', removeWhitelist, {'id': id});
        }
        //更新名单
        ,updateWhitelist (id) {
            eventHub.$emit('open-modal', updateWhitelist, {'id': id});
        }
        //导入excel
        ,addExcel () {
            eventHub.$emit('open-modal', addExcel,{'ssoId':this.ssoId});
        }
        //批量修改额度
        ,editCredit(){
            eventHub.$emit('open-modal', editCreditExcel, {'ssoId':this.ssoId});
        }
        //批量移除Excel
        ,removeExcel(){
            eventHub.$emit('open-modal', removeWhiteExcel, {'ssoId':this.ssoId});
        }
        //打开历史授信
        ,goHistory (uid) {
            this.$router.push({name: 'whitelistHistory'})            
        }
    }
    ,beforeDestroy () {
        //注销组件前，关闭所有弹窗
        eventHub.$emit('close-all-modal')
    }
}
</script>