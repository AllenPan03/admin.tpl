<template>
    <a type="button" class="btn btn-default btn-sm btn-outline" href="javascript:;" @click.stop="goBack"><i class="icon-backward"></i>&nbsp;返回</a>
</template>
<script>
    export default {
        methods: {
            'goBack': function () {
                this.$router.go(-1)
            }

        }
    }
</script>