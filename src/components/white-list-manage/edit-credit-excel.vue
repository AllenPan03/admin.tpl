<style lang="scss">
    @import './alert-whitelist.scss';
</style>
<style>
    .change-edit-body {
        padding-top: 30px;
        padding-bottom: 30px;
    }
</style>
<template>
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="goBack" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">批量导入</h4>
          </div>
          <div class="modal-body">
            <div class="col-xs-12 form-inline group-left validateModal center-block  uploading upload">
              <div class="form-group col-xs-12">
                <div class="form-group">
                  <form action="" method="post" id="upload-form" enctype='multipart/form-data'>
                    <input type="file" id="excelList" name="excelList" accept=".xls,.xlsx"/>
                      <p class="help-block">提示：支持excel上传</p>  
                  </form>    
                </div>
              </div>
            </div>
            <div class="preview y-scroll-350" style="display: none">
              <table class="table table-bordered " style="margin: 0">
                <thead>
                <tr>
                  <th>序号</th>
                  <th>姓名</th>
                  <th>身份证号</th>
                  <th>手机号</th>
                  <th>额度</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in addDataList">
                      <td>{{index+1}}</td>
                      <td>{{item.uname}}</td>
                      <td>{{item.idcard}}</td>
                      <td>{{item.mobile}}</td>
                      <td>{{fMoney(item.creditmoney)}}</td>
                    </tr>
                </tbody>
              </table>
              <!--暂无数据 start-->
                <div class="noData">
                    {{errorInfo}}
                </div>
              <!--暂无数据 end-->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default btn-upload" @click="upLoad">上传</button>
              <button type="button" class="btn btn-default btn-confirm" @click="confirm" style="display: none">确认上传</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
</template>
<script>
/*
 * 导入excel名单
 */
import action from '../../action/interface.js' 
import mixins from '../mixin.js'

var url = action.rootPath + action.interface.whiteUpload
var whitePreviewUrl = action.rootPath + action.interface.whitePreview
var confirmUrl = action.rootPath + action.interface.whiteConfirmUpdate
    export default {
        props: ['modalProps']
        ,data () {
            return {'excelList': '',addDataList:[]}
        }
        ,methods: {
        upLoad () {
            var files = $("#excelList")[0].files[0], fileName = '';
            //添加上传信息
            var filesLen = files.length;
            var html = "";
            var vm = this;
            $('#upload-list').html(html);
            var data = {                //传递参数
            fileName : fileName,
            ssoId:this.modalProps.ssoId
            };
            $('#upload-form').ajaxSubmit({
            url: url,
            type: 'post',
            data: data,
            success: function(res){
                res = JSON.parse(res);
                if(res.code == 403){
                    eventHub.$emit('show-alert', res.errorMsg);
                }else if (res.errorcode == 0) {
                    vm.whitePreview();
                } else {
                    eventHub.$emit('show-alert', '文件上传失败！')
                }
                }
            })
      }
      //名单预览
      ,whitePreview(){
        $(".upload,.btn-upload").hide();
        $(".preview,.btn-confirm").show();
        let vm = this
        this.post(whitePreviewUrl, {ssoId:this.modalProps.ssoId}, function (res) {
            if(res.code == 403){
                eventHub.$emit('show-alert', res.errorMsg);
            }else if (res.errorcode == 0) {
                vm.addDataList = res.result
            } else {
                eventHub.$emit('show-alert', res.message)
            }
        }) 
      }
      //确认上传
      ,confirm(){
        this.post(confirmUrl, {ssoId:this.modalProps.ssoId}, function (res) {
            if (res.errorcode == 0) {
                eventHub.$emit('show-alert', '导入成功','refresh');
            } else {
                eventHub.$emit('show-alert', res.message)
            }
        }) 
      }
      ,goBack () {//返回
        eventHub.$emit('close-modal')
      }
    }
      ,mixins: [mixins]
    }
</script>