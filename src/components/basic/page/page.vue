<style lang="scss">
    @import './page.scss';
</style>
<template>
    <div class="page">
    <div class="curPage">显示第{{(pageInfo.currentpage - 1) * pageInfo.pageSize + 1}}条至第{{curMaxNum}}条，共{{total}}条记录</div>
    <div class="total"><span>跳至</span><input name="inputPage" type="number" class="x-page-input" :value="pageInfo.currentpage"/><span>页</span> <button type="button" class="btn x-page-goto-page" @click="changePage()">跳转</button></div>
    <ul class="pagination" v-if="total > 0"></ul>
    </div>
</template>
<script>
/*
 * 分页组件 依赖插件jqPaginator.js 不支持total = 0 的情况
 * param: {'pageInfo': {'pageSize', 'currentPage'},'total'}
 * $emit: 'go-page(num)'
 */
export default({
    props: {
        'pageInfo': {
            default () {
                return {'pageSize': 6, 'currentpage': 1}
            }
        }
        ,'total': {
            default: 100
        }
    }
    ,data () {
        return {'inputNum': ''}
    }
    ,computed: {
        'curMaxNum': function () {
            var _max = this.pageInfo.currentpage * this.pageInfo.pageSize;
            _max = (_max > this.total) ? this.total : _max;
            return _max;
        }
        ,'totalPage': function () {
            return window.Math.ceil(this.total/this.pageInfo.pageSize)
        }
    }
    ,updated() {
        //jqPaginator不支持　total =　0　的情况
        if (this.total > 0) {
                this.initPage()                
        }

    }
    ,methods: {
        //跳转至第几页
        'changePage': function () {
            let num = $('input[name="inputPage"]').val()
            num = parseInt(num);
            if(isNaN(num)) return;
            //如果大于最大页面，则跳转至最大页数
            if( num > this.totalPage) num = this.totalPage
            //如果小于最小0，则跳转至第一页
            if( num <= 0 ) num = 1
            $('input[name="inputPage"]').val(num)
            this.pageInfo.currentpage = num;
            $(".pagination").jqPaginator('option', {
                currentPage: num
            })
            eventHub.$emit('go-page', num);
        }
        ,'initPage': function () {
            let vm = this;
            let total = parseInt(vm.total);
            let _cPage = 0;
            if (total != 0) {
                _cPage = vm.pageInfo.currentpage
            }
            //分页显示
            $.jqPaginator('.pagination',{
                totalCounts: vm.total,
                pageSize: vm.pageInfo.pageSize,
                visiblePages: 5,
                currentPage: _cPage,
                first: '',
                last: '',
                prev: '<li class="prev"><a href="javascript:void(0);"><i class="icon-chevron-left"></i>上一页</a></li>',
                next: '<li class="next"><a href="javascript:void(0);">下一页<i class=" icon-chevron-right"></i></a></li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li><li>添加</li>',
                onPageChange: function (num, type) {
                    //vm.changePage(num)
                    eventHub.$emit('go-page', num);
                }
            });
        }
    }
});
</script>