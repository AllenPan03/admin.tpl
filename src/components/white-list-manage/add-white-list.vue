<style lang="scss">
@import "./alert-whitelist.scss";
</style>
<template>
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="goBack"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">新增白名单</h4>
          </div>
          <div class="modal-body">
            <form  id="addList" class="regForm ">
              <div class="col-xs-12 form-inline group-left validateModal">
                <div class="form-group col-xs-12">
                  <label class="control-label">
                    客户姓名：
                  </label>
                  <input class="form-control input-sm input-normal" type="text" name="uname" v-model="uname" required>
                </div>
                <div class="form-group col-xs-12 hideP">
                  <label class="control-label">
                    手机号码：
                  </label>
                  <input class="form-control input-sm input-normal" name="mobile" v-model="mobile" required type="text">
                </div>
                <div class="form-group col-xs-12 hideP">
                  <label class="control-label">
                    客户等级：
                  </label>
                  <input class="form-control input-sm input-normal" name="level" v-model="level"  type="text" required>
                </div>
                <div class="form-group col-xs-12 hideP">
                  <label class="control-label">
                    总额度：
                  </label>
                  <input class="form-control input-sm input-normal" name="creditmoney" v-model="creditmoney" required type="text">
                  <span>元</span>
                </div>
                <div class="form-group col-xs-12">
                  <label>备注：</label>
                  <textarea class="note" required  name="remark" v-model="remark"></textarea>
                </div>
            </div></form>
          </div>
          <div class="modal-footer">
            <save-back-btn></save-back-btn>
            </div>
          <!-- /.modal-content -->
        </div>
</template>
<script>
/*
 * 新增白名单
 */
import action from "../../action/interface.js";
import mixins from "../mixin.js";

import saveBackBtn from "../query-btn-group/save-back-btn.vue";

var url = action.rootPath + action.interface.whiteAdd;
export default {
  components: { saveBackBtn },
  data() {
    return {
      uname: "",
      idcard: "",
      mobile: "",
      creditmoney: "",
      validterm: "",
      remark: "",
      minRepayRatio: "",
      level: ""
    };
  },
  computed: {
    params: function() {
      let vm = this;
      return {
        uname: this.uname,
        mobile: this.mobile,
        creditmoney: this.creditmoney,
        remark: this.remark,
        level: this.level
      };
    }
  },
  mounted() {
    eventHub.$on("do-save", this.doSave);
    eventHub.$on("go-back", this.goBack);
    $("#addList").validate({
      rules: {
        creditmoney: "plusNumber",
        validterm: "plusNumber",
        mobile: {
          mobile: true
        },
        idcard: {
          idCard: true
        }
      }
    });
  },
  mixins: [mixins],
  methods: {
    //保存
    doSave() {
      if ($("#addList").valid()) {
        let _params = this.params;
        this.post(url, _params, function(res) {
          if (res.code == 403) {
            eventHub.$emit("show-alert", res.errorMsg);
          } else if (res.code == 0) {
            eventHub.$emit("show-alert", "保存成功！", "refresh");
            $("#addList")[0].reset();
          } else {
            eventHub.$emit("show-alert", res.message);
          }
        });
      }
    },
    goBack() {
      //返回
      eventHub.$emit("close-modal");
    }
  }
};
</script>