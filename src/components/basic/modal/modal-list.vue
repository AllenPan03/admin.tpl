<template>
    <modal v-for="item in modalList">
        <button slot="footer"></button>
    </modal>
</template>
<script>
    import modal from './modal.vue'
    export default {
        data () {
            return {
                'modalList': [1]
            }
        }
        ,created () {
            //创建模态关闭某一个的事件
            //创建开启某一个模态的事件，包括新增
            //创建关闭所有模态的事件
        }
        ,components: {'modal': modal}

    }
</script>