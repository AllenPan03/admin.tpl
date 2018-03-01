var origin = window.location.origin + '/'
var action = {
    rootPath: "http://192.168.90.14:3000/api/",
    timeout: 2000,
    method: "post",
    interface: {
        //判断是否初始化
        initialized:'initialized',
        //初始化配置账号密码
        setup: 'setup',
        //登录
        login: 'login',
        //导航
        menu: 'log/index',
        //客户信息
        whiteQuery: 'white/query',
        //客户操作历史
        whiteQueryhistory: 'white/queryoperation',
        //客户新增接口
        whiteAdd: 'white/add',
        //查询单个客户详情
        whiteOne: 'white/query/one',
        //导入客户接口
        whiteUpload: 'white/upload',
        //删除客户接口
        whiteDelete: 'white/delete',
        //更新客户接口
        whiteUpdate: 'white/update',
    }
};
export default action