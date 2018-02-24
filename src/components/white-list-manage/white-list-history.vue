<template>
    <div class="grey-list box col-xs-12 box-inner clearfix">
        <form-group>
            <!--<name-condition slot="input" q-name="uname" v-model="uname"></name-condition>-->
            <mobile-condition slot="input" q-name="mobile" v-model="mobile"></mobile-condition>
            <query-btn-group slot="btn"></query-btn-group>
            <button type="button" slot="btn" class="btn btn-default btn-outline" style="margin-left:12px;" @click="goBack">返回上一页</button>
        </form-group>
        <div class="">
              <table class="table table-bordered ">
                <thead>
                <tr>
                  <th>序号</th>
                  <th>客户姓名</th>
                  <th>身份证号码</th>
                  <th>手机号码</th>
                  <th>总额度（元）</th>
                  <th>动作</th>
                  <th>操作时间</th>
                  <th>备注</th>
                </tr>
                </thead>
                <tbody>
               <tr v-for="(item, index) in reDataList">
                <td>{{(pageNum - 1) * 8 + index + 1}}</td>
                <td>{{item.uname}}</td>
                <td>{{item.idcard}}</td>
                <td>{{item.mobile}}</td>
                <td>{{item.creditmoney}}</td>
                <td v-if="item.operation==0">删除</td><td v-if="item.operation==1">新增</td><td v-if="item.operation==2">更新</td>
                <td>{{item.time}}</td>
                <td>{{item.remark}}</td>
              </tr>
                </tbody>
              </table>
              <!--暂无数据 start-->
            <div class="noData">
                {{errorInfo}}
            </div>
          <!--暂无数据 end-->
        </div>
        <page :pageInfo="pageInfo" :total="total"></page>
  </div>

</template>

<script>
/*
 * 白名单操作历史
 */
import action from '../../action/interface.js' 
import mixins from '../mixin.js'

import queryBtnGroup from '../query-btn-group/query-btn-group.vue'
import dateCondition from '../form-group/date-condition.vue'
import formGroup from '../form-group/form-group.vue'
import nameCondition from '../form-group/name-condition.vue'
import mobileCondition from '../form-group/mobile-condition.vue'
import page from '../basic/page/page.vue'
import footerBtnGroup from '../basic/footer-btn/footer-btn-group.vue'

//var url = action.rootPath + action.interface.creditQueryhistory
var pagesize = 8
    export default {

        components: {queryBtnGroup, dateCondition, formGroup, page, footerBtnGroup,nameCondition,mobileCondition}
        ,data () {
            return {'uname': '', 'mobile': '','pageNum': 1, 'total': 0, 'reDataList': [], 'uid': this.$route.query.uid, 'errorInfo': '', 'validdate': ''}
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
            ,'url': function () {
              return action.rootPath + action.interface.whiteQueryhistory
            }
        }
        ,created () {
            this.doQuery()
        //监听查询
        eventHub.$on('do-query', this.clickQuery)
        //监听刷新
        eventHub.$on('do-refresh', this.doQuery)
        //监听跳转第几页
        eventHub.$on('go-page', this.goPage)
        }
        ,methods: {
          goBack () { //返回
            this.$router.go(-1)
          }
        }
        ,mixins: [mixins]
    }
</script>