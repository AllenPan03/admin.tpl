<style lang="scss">
    @import './alert-whitelist.scss';
</style>
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">更新客户</h4>
        </div>
        <div class="modal-body">
            <form action="#" method="post" id="updateWhite" class="regForm">
                <div class="col-xs-12 form-inline group-left validateModal">
                    <div class="form-group col-xs-12 clearfix">
                        <p>
                            <label for="" class="fl">客户姓名：</label>{{uname}}</p>
                    </div>
                    <div class="form-group col-xs-12">
                        <p>
                            <label for="" class="fl">手机号码：</label>{{mobile}}</p>
                    </div>
                    <div class="form-group col-xs-12">
                        <label>客户等级：</label>
                        <input class="form-control input-sm input-normal" name="level" v-model="level" type="text" required>
                    </div>
                    <div class="form-group col-xs-12">
                        <label>总额度：</label>
                        <input class="form-control input-sm input-normal" name="creditmoney" v-model="creditmoney" required type="text">
                        <span>元</span>
                    </div>
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <save-back-btn></save-back-btn>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</template>
<script>
/*
 * 更新客户
 * params: {modalProps: {id: 记录id}}
 */
import action from '../../action/interface.js' 
import mixins from '../mixin.js'
import dict from '../../js/dict.js'
import currency from '../../js/currency.js'

import saveBackBtn from '../query-btn-group/save-back-btn.vue'

var queryProd = action.rootPath + action.interface.whiteOne
var saveAction = action.rootPath + action.interface.whiteUpdate
    export default {
        props: ['modalProps']
        ,data () {
            return {'uname': '', 'idcard': '', 'mobile': '', 'minrepayratio': '',currency,'creditmoney':'','level':''}
        }
        ,components: {saveBackBtn}

        ,created () {
            //请求详情内容
            let vm = this
            vm.post(queryProd, {'id': vm.modalProps.id}, function (res) {
                if (res.code == 0) {
                    vm.uname = res.data.uname
                    vm.idcard = res.data.idcard
                    vm.mobile = res.data.mobile
                    vm.level = res.data.level
                    vm.creditmoney = res.data.creditmoney
                    vm.minrepayratio = vm.currency.mul(res.data.minrepayratio,100)
                }
            })
        }
        ,mounted () {
            eventHub.$on('do-save', this.doSave)
            eventHub.$on('go-back', this.goBack)
        }        
        ,methods: {
            //保存
            doSave () {
                if ($('#updateWhite').valid()){
                    let _params = {'id': this.modalProps.id,'creditmoney':this.creditmoney,'level':this.level ? this.level :''}
                    this.post(saveAction, _params, function (res) {
                        if (res.code == 0) {
                            eventHub.$emit('show-alert', '保存成功！','refresh');
                            $('#updateWhite')[0].reset();
                        } else {
                            eventHub.$emit('show-alert', res.message)
                        }
                    })                    
                }

            }
            ,close () {
                eventHub.$emit('close-modal')
            }
            ,goBack () {//返回
                eventHub.$emit('close-modal')
            }
        }
        ,mixins: [mixins]
    }
</script>