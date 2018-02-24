<style lang="scss">
    @import "./form-group.scss";
</style>
<template>
        <form :id="id" class="form-inline query-form clearfix">
            <slot name="input"></slot>
            <slot name="btn"></slot>
        </form>        
</template>
<script>
    export default {
        props: ['id']
    }
</script>