<style lang="scss">
    @import "./modal.scss";

</style>
<template>
    <div class="modal fade in" tabindex="-1" :id="id" role="dialog" aria-labelledby="bor-addLabel" aria-hidden="true">
        <div class="modal-dialog" :style="{width: modalW ? modalW : '600px'}" :id="'content-' + id">
            <slot></slot>
        </div>
    </div>
</template>
<script>
/*
 * Modal 弹窗模板,　带头部和页脚的取消按钮，　content内容通过dom操作引入
 * param: ｛'id(弹窗ＩＤ)', modalW (弹窗宽度)｝
 */
    export default({
        props: ['id', 'modalW']

    });
</script>

