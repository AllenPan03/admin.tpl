<style lang="scss">
    @import './alert-msg.scss';
</style>
<template>
    <div class="modal-content alert-content">
        <div class="alert-head">提示</div>
        <div class="alert-body">{{modalProps.msg}}</div>
        <div class="alert-footer">
            <button type="button" @click="makeTrue" class="btn btn-default x-space">确认</button>   
            <button type="button" @click="close" class="btn">取消</button>           
        </div>
    </div>
</template>
<script>
/*
 * 提示弹窗,主页初始化时加载， $('#content-msg-alert').html()改变内容
 */
    export default {
        props: ['modalProps']
        ,methods: {
            makeTrue () {
                eventHub.$emit('make-true')
            }
            ,close () {
                //eventHub.$emit('close-alert')
                eventHub.$emit('close-all-modal')
            }
        }
    }
</script>