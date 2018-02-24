<style lang="scss">
    @import './alert-msg.scss';
</style>
<template>
    <div class="modal-content alert-content">
        <div class="alert-head">提示</div>
        <div class="alert-body">{{msg}}</div>
        <div class="alert-footer">
            <button type="button" class="btn btn-default" @click="close">确认</button>            
        </div>
    </div>
</template>
<script>
/*
 * 提示弹窗,主页初始化时加载， $('#content-msg-alert').html()改变内容
 */
    export default {
        props: ['msg','refresh','routeName','query']
        ,methods: {
            close () {
                eventHub.$emit('close-all-modal')
                eventHub.$emit('close-modal')
                if(this.refresh){
                    // window.location.reload()
                    eventHub.$emit('do-reload')
                }
                if(this.routeName){
                     if(this.query){
                         this.$router.push({name: this.routeName,query:eval("("+this.query+")")}) 
                     }else{
                         this.$router.push({name: this.routeName}) 
                     }     
                }
            }
        }
    }
</script>