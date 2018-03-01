<style lang="scss">
@import "./alert-whitelist.scss";
</style>
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">移除客户</h4>
        </div>
        <div class="modal-body">
            <form action="#" method="post" id="deleteWhite" class="regForm">
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
                        <label>备注：</label>
                        <textarea class="note" v-model="remark" required></textarea>
                    </div>
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" @click="clickSave">确认</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</template>
<script>
/*
 * 移除客户
 * params: {modalProps: {id: 记录id}}
 */
import action from "../../action/interface.js";
import mixins from "../mixin.js";
import dict from "../../js/dict.js";

import saveBackBtn from "../query-btn-group/save-back-btn.vue";

var queryProd = action.rootPath + action.interface.whiteOne;
var saveAction = action.rootPath + action.interface.whiteDelete;
export default {
  props: ["modalProps"],
  data() {
    return { uname: "", idcard: "", mobile: "", remark: "" };
  },
  components: { saveBackBtn },

  created() {
    //请求详情内容
    let vm = this;
    vm.post(queryProd, { id: vm.modalProps.id }, function(res) {
      if (res.code == 0) {
        vm.uname = res.data.uname;
        vm.idcard = res.data.idcard;
        vm.mobile = res.data.mobile;
      }
    });
  },
  mounted() {
    eventHub.$on("go-back", this.goBack);
  },
  methods: {
    //确认删除
    clickSave() {
      if ($("#deleteWhite").valid()) {
        let _params = {
          id: this.modalProps.id,
          uname: this.uname,
          mobile: this.mobile,
          idcard: this.idcard,
          remark: this.remark
        };
        this.post(saveAction, _params, function(res) {
          if (res.code == 403) {
            eventHub.$emit("show-alert", res.errorMsg);
          } else if (res.code == 0) {
            eventHub.$emit("show-alert", "移除成功！");
            $("#deleteWhite")[0].reset();
          } else {
            eventHub.$emit("show-alert", res.message);
          }
        });
      }
    },
    close() {
      eventHub.$emit("close-modal");
    },
    goBack() {
      //返回
      eventHub.$emit("close-modal");
    }
  },
  mixins: [mixins]
};
</script>