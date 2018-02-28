<style lang="scss">
@import "./tab-show.scss";
</style>
<template>
    <div class="tab-wrap">
        <ul class="nav nav-tabs tab-show">
            <li v-for="tab in tabList" role="presentation" :style="{width: liWidth + 'px'}" :class="{active: tab.active}"><a href="javascript:;" @click="clickTab(tab.tabId)">{{tab.title}}</a><i class="close" :class="{active: tab.active}" @click.stop="closeTab(tab.tabId)">x</i><div v-if="tab.active" class="x-navtab-bar"></div></li>
        </ul>
        <div class="tab-content">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        </div>
    </div>
</template>
<script>
/*
 * tab切换组件，需绑定路由实现。
 * nav-tabs区域的逻辑：可以关闭任意tab，或通过路由name切换tab 
 */
export default {
  data() {
    return {
      tabList: [{ tabId: "welcome", title: "welcome", active: false }], //tab列表的主键，包括tabId(用于路由切换，同路由name), tab标题，active:是否激活。 content由路由控制。
      flag: true, //控制左右滑动
      liWidth: 140,
      title: ""
    };
  },
  created() {
    eventHub.$on("add-tab", this.addTab);
    eventHub.$on("toggle-tab", this.toggleTab);
    // console.log(this.$route)
  },
  beforeDestroy() {
    eventHub.$off("add-tab", this.addTab);
    eventHub.$off("toggle-tab", this.toggleTab);
    eventHub.$off("close-tab", this.closeNow);
  },
  mounted() {
    $(".tab-show li").mouseenter(function() {
      // alert(4)
    });
  },
  watch: {
    tabList: function() {
      let vm = this;
      console.log($(".tab-wrap .nav").width());
      if (vm.tabList.length * 140 > $(".tab-wrap .nav").width()) {
        vm.liWidth = Number(
          $(".tab-wrap .nav").width() / (vm.tabList.length + 1)
        );
      }
    }
  },
  methods: {
    toggleTab: function() {
      this.flag = !this.flag;
      if (this.flag) {
        $(".tab-wrap").animate({ "padding-left": "224px" });
        //$('.tab-content').css({width: 'calc(100% - 258px)'});
      } else {
        $(".tab-wrap").animate({ "padding-left": "68px" });
        //$('.tab-content').css({width: 'calc(100% - 18px)'});
      }
    },
    addTab(tabId, title) {
      let _list = this.tabList;
      let hasId = false;
      _list.map(function(item) {
        item.active = false;
        if (tabId == item.tabId) {
          hasId = true;
          item.active = true;
        }
      });
      //如果不存在,则插入一条,并激活
      if (!hasId) {
        _list.push({ tabId: tabId, title: title, active: true });
      }
      this.tabList = _list;
    },
    //删除与tabId匹配的元素，并给下一个元素设置激活状态
    closeTab(tabId) {
      let _list = this.tabList;
      let _curIndex;
      _list = _list.filter(function(item, index) {
        if (tabId == item.tabId) {
          _curIndex = index;
          return false;
        } else {
          return true;
        }
      });
      console.log(_list);
      //给下一个元素设置激活状态
      if (_list.length > 0) {
        //下一个激活的 tab
        let _index = _curIndex < _list.length ? _curIndex : _list.length - 1;
        if (_index == _list.length - 1) {
          _list[_index].active = true;
        }
        this.$router.push(_list[_index].tabId);
      } else {
        //如果删除的是最后一条，则打开 welcome页
        // _list.push({'tabId': 'welcome', 'title': 'welcome', 'active': true})
        this.$router.push("welcome");
      }
      this.tabList = _list;
    },
    //点击tab
    clickTab(tabId) {
      let vm = this;
      let _list = this.tabList;
      _list.map(function(item, index) {
        //原先激活的tab，改变状态
        if (item.active && tabId != item.tabId) {
          item.active = false;
        } else if (tabId == item.tabId) {
          //当前激活的tab
          item.active = true;
          //设置当前路由
          vm.$router.push(item.tabId);
        }
      });
    }
  }
};
</script>