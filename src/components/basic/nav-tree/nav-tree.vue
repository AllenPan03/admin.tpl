
<style lang="scss">
@import "./nav-tree.scss";
</style>
<template>
<transition name="slide-left">
    <div>
        <div class="nav-tree">
            <div class="tree">
                <ul class="root-menu">
                    <template v-for="(list, index) in menuList">
                        <li :class="[{active: list.checked} ,list.type == 0 ? 'x-navmenu-collapsable' : '']">
                            <i :class="[list.checked ? 'icon-angle-down' : 'icon-angle-right', 'sub-control']" v-if="list.children"></i>
                            <a href="javascript:void(0);" v-if="list.type == 0" @click.stop="clickNode(list.id)">
                                <svg class="icon" aria-hidden="true">
                                    <use v-if="list.checked" :xlink:href="`#`+getIcon(list.attribute,1)"></use>
                                    <use v-else :xlink:href="`#`+getIcon(list.attribute,0)"></use>
                                </svg>
                                <span>{{list.name}}</span>
                            </a>
                            <a href="javascript:void(0);" @click="clickNode(list.id)" v-else>
                                <svg class="icon" aria-hidden="true">
                                    <use v-if="list.checked" :xlink:href="`#`+getIcon(list.attribute,1)"></use>
                                    <use v-else :xlink:href="`#`+getIcon(list.attribute,0)"></use>
                                </svg>
                                {{list.name}}
                            </a>
                            <ul class="sub-menu" v-show="list.type == 0 && list.checked" :class="{'active': list.checked, 'checked': list.checked}">
                                <template v-for="item in list.children">
                                    <li :class="{'blue-header': item.checked}">
                                        <a href="javascript:void(0);" @click="clickNode(item.id)">{{item.name}}</a>
                                    </li>                                    
                                </template>
                            </ul>
                        </li>                        
                    </template>
                </ul>
            </div>
        </div>
        <div class="small-tree" v-if="!flag">
            <ul class="menu-icon-list">
                <li v-for="(list, index) in menuList" @mouseenter="list.type==0?showList(list, index, $event):''" @mouseleave="leaveList($event)" @click="list.type==1?clickNode(list.id):''">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="`#`+getIcon(list.attribute,0)"></use>
                    </svg>
                </li>
            </ul>
            <div class="list-detail" @mouseenter="showDetail($event)" @mouseleave="leaveDetail($event)">
                <ul>
                    <li v-for="(item, index) in showMenu" @mouseenter="showChildren(item)" @click="clickNode(item.id)">
                        <a>{{item.name}}</a>
                    </li>
                </ul>
            </div>
            <div class="child-detail" @mouseenter="showDetail($event, 2)" @mouseleave="leaveDetail($event, 2)">
                <ul>
                    <li v-for="(item, index) in childMenus" @click="clickNode(item.id)">
                        <a>{{item.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</transition>
</template>
<script>
/*
 * 导航菜单
 * api: {'toggle-nav': 开合导航}
 */
import mixins from "../../mixin.js";
import action from "../../../action/interface.js";
//测试模拟数据
let data = {
  column: {
    name: "菜单",
    description: "",
    data: "",
    type: 0,
    children: [
      {
        name: "客户管理",
        description: "客户管理",
        data: "/whiteList",
        attribute: "icon-yonghuguanlixianxing#icon-kehuguanli",
        type: 1,
      }
    ]
  },
  userName: "pan.junlin",
  ssoId: 38045
};

let menuList = data.column.children;

//console.log(menuList)
export default {
  mixins: [mixins],
  data() {
    return {
      menuList: [], //导航菜单数据
      openMenu: "", //打开的是哪个二级菜单，menuList中的ID对应
      uname: "", //用户姓名
      flag: true,
      //, 'menuType' : $.enumList.menuType
      showMenu: [],
      childMenus: []
    };
  },
  computed: {
    //分页用
    btnList: function() {
      let btnList = this.btnList;
      return btnList;
    }
  },
  created() {
    //创建关闭导航事件
    eventHub.$on("toggle-nav", this.toggleNav);
    // 请求导航数据
    let menuAction = action.rootPath + action.interface.menu;
    let vm = this;
    var api = "http://portal.wdai.com/api";
    // 初始化 axios
    var origin = window.location.origin;
    
    //测试环境需要
    let _list = menuList;
    _list.map(function(item) {
      //父节点赋值
      item.checked = false;
      //子节点赋值
      if (item.type == 0) {
        let _children = item.children;
        _children.map(function(child) {
          child.checked = false;
        });
      }
    });
    vm.menuList = _list;
    //测试环境需要
    if (data.column.children) {
      let _list = data.column.children;
      let _id = 1,
        _childId = 20;
      _list.map(function(item) {
        //父节点赋值
        _id = _id + 1;
        item.id = _id;
        item.checked = false;
        //子节点赋值
        if (item.type == 0) {
          let _children = item.children;
          _children.map(function(child) {
            _childId = _childId + 1;
            child.id = _childId;
            child.checked = false;
          });
        }
      });
      vm.menuList = _list;
      vm.uname = data.userName;
      //触发显示姓名事件，把username上传到父节点
      eventHub.$emit("show-uname", data.userName);
    }
    //    vm.post(menuAction, {}, function (res) {
    //         //请求返回的数据多一级，过滤
    //         //res = JSON.parse(res).result;
    //         //res = res.result;
    //         console.log(res)
    //         //console.log(typeof(res))
    //         if(res.column.children){
    //             let _list = res.column.children
    //             let _id = 1 ,_childId = 20;
    //             _list.map(function (item) {
    //                 //父节点赋值
    //                 _id = _id +1;
    //                 item.id = _id;
    //                 item.checked = false
    //                 //子节点赋值
    //                 if (item.type == 0) {
    //                     let _children = item.children
    //                     _children.map(function (child) {
    //                         _childId = _childId + 1;
    //                         child.id = _childId;
    //                         child.checked = false
    //                     })
    //                 }
    //             })
    //             vm.menuList = _list
    //             vm.uname = res.userName
    //             //触发显示姓名事件，把username上传到父节点
    //             eventHub.$emit('show-uname', res.userName)
    //         }
    //     })
  },
  mounted() {
    $(".nav-tree").mCustomScrollbar({
      enable: false,
      theme: "minimal-dark",
      scrollInertia: 100
    });
  },
  methods: {
    //关闭导航
    toggleNav() {
      this.flag = !this.flag;
      if (this.flag) {
        $(".nav-tree").animate({ "margin-left": "0" });
      } else {
        $(".nav-tree").animate({ "margin-left": "-210px" });
      }
    },
    //点击节点
    clickNode(_nodeId) {
      let _list = this.menuList;
      let _curItem;
      let menuStatus;
      //遍历根节点
      _list.map(function(item) {
        //如果是当前节点
        if (_nodeId == item.id) {
          _curItem = item;
          //当前节点有子节点，则checked取非
          if (item.type == 0) {
            item.checked = !item.checked;
          } else {
            //当前节点无子节点，则checked = true
            item.checked = true;
          }
        } else {
          //如果父节点不匹配,且点击是非根节点时，继续遍历子节点
          if (item.type == 0) {
            let _children = item.children;
            let _clickChild = false; //子节点是否命中
            //遍历子节点
            _children.map(function(child) {
              if (_nodeId == child.id) {
                _curItem = child;
                child.checked = true;
                _clickChild = true;
              } else {
                child.checked = false;
              }
            });
            //子节点未命中，则关闭子节点
            if (!_clickChild) {
              item.checked = false;
            }
          } else {
            item.checked = false;
          }
        }
      });
      //this.$set('menuList', _list)
      this.menuList = _list;
      //切换 tab
      console.log(JSON.stringify(_curItem));
      if (_curItem.type == 1) {
        // tab-nav
        eventHub.$emit("add-tab", _curItem.data, _curItem.name);
        //change route
        this.$router.push(_curItem.data);
      }
    },
    //获取图标
    getIcon(t, i) {
      if (t) {
        let d = t.split("#");
        return d[i];
      }
    },
    //移上小标签
    showList(item, index, e) {
      this.showMenu = item.children;
      let lengthN = this.showMenu.length;
      let screenW = window.document.body.offsetHeight;
      //debugger
      let top = index * 35;
      $(".list-detail").show(), $(".list-detail").css({ top: top });
      $(".child-detail").css({ top: top });
    },
    //移出小标签
    leaveList(e) {
      $(".list-detail").hide();
    },
    //移进悬浮层
    showDetail(e, index) {
      $(e.target).show();
      if (index == 2) {
        $(".list-detail").show();
      }
    },
    //移出悬浮层
    leaveDetail(e, index) {
      $(e.target).hide();
      if (index == 2) {
        $(".list-detail").hide();
      } else {
        $(".child-detail").hide();
      }
    },
    //一级浮层级联二级浮层
    showChildren(item) {
      console.log(item);
      if (item.children) {
        (this.childMenus = item.children), $(".child-detail").show();
      } else {
        (this.childMenus = []), $(".child-detail").hide();
      }
    }
  }
};
</script>
