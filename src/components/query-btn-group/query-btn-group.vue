
<template>
    <span>
    <a type="button" class="btn btn-default btn-sm btn-outline x-space" href="javascript:;" @click="doQuery">查询</a><a type="button" class="btn btn-sm btn-outline" href="javascript:;" @click="doRefresh">刷新</a>
    </span>
</template>
<script>
/*
 * 查询区按钮
 */
    export default {
        methods: {
            'doQuery': function () {
                eventHub.$emit('do-query');
            }
            ,'doRefresh': function () {
                eventHub.$emit('do-refresh');
            }
        }
    }
</script>