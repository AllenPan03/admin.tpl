
<template>
    <span>
        <button type="button" class="btn btn-default" @click.stop="clickSave">保存</button>
        <button type="button" class="btn" @click="goBack">返回</button>
    </span>
</template>
<script>
/*
 * 保存返回按钮
 */
export default {
    methods: {
        'clickSave': function () {
            eventHub.$emit('do-save');
        }
        ,'goBack': function () {
            eventHub.$emit('go-back');
        }
    }
}
</script>