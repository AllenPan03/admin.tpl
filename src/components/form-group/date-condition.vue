<style lang="scss">
    @import "./form-group.scss";
</style>
<template>
    <input type="text" :name="qName" class="date-input form-control" v-model="inputV" :class="qClass"  @input="onInput"/>
</template>
<script>
/*
 * 时间查询条件，H5默认时间样式
 * param: {key,value, qClass(样式)}
 */
    export default {
        props: ['qName', 'value', 'qClass']
        ,data () {
            return {'inputV': ''}
        }
        ,methods: {
            onInput: function (e) {
                console.log(e)
                e = e || event;
                this.$emit('input', e.target.value)
            }
        }
        ,mounted() {
            $('.date-input').datetimepicker({
                minView: 2, 
                weekStart:1,
        　　    format: "yyyy-mm-dd", //选择日期后，文本框显示的日期格式 
        　　    autoclose:true //选择日期后自动关闭
            });
        }
    }
</script>