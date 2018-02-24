<style lang="scss">
    @import "./form-group.scss";
</style>
<template>
    <div class="form-group col-md-3">
        <label class="control-label col-md-4">客户ID：</label>
        <div class="col-md-8">
            <input type="text" :name="key" class="form-control" placeholder="" :value="value" @input="onInput"/>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['value']
        ,methods: {
            onInput: function (e) {
                console.log(e)
                e = e || event;
                this.$emit('input', e.target.value)
            }
        }
    }
</script>