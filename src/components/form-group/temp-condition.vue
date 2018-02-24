<style lang="scss">
    @import "./form-group.scss"
</style>
<template>
    <div class="form-group col-md-4">
        <label class="control-label col-md-4">{{sName}}</label>
        <div class="col-md-8">
            <slot></slot>
        </div>
    </div>
</template>
<script>
/*
 * 查询条件输入框样式，固定宽度25%, label 1/3 input 2/3
 * param: {sName}
 */
    export default {
        props: ['sName']

    }
</script>