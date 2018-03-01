<style lang="scss">
    @import "./form-group.scss";
</style>
<template>
    <div class="form-group col-md-4">
        <label class="control-label col-md-4">手机号码：</label>
        <div class="col-md-8">
        <input type="text" :name="qName" class="form-control" maxlength="11" :placeholder="placeholder"  :value="value" @input="onInput"/>
        </div>
    </div>
</template>
<script>
/*
 * 手机号查询条件，H5默认时间样式
 * param: {qName,value,placeholder}
 */
    export default {
        props: ['qName', 'value', 'placeholder']
        ,methods: {
            onInput: function (e) {
                console.log(e)
                e = e || event;
                this.$emit('input', e.target.value)
            }
        }
    }
</script>