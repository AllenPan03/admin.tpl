var origin = window.location.origin + '/'
var action = {
    rootPath: "http://192.168.92.229:3000/api/",
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
        //白名单信息
        whiteQuery: 'white/query',
        //白名单操作历史
        whiteQueryhistory: 'white/queryoperation',
        //白名单新增接口
        whiteAdd: 'white/add',
        //查询单个白名单详情
        whiteOne: 'white/query/one',
        //导入白名单接口
        whiteUpload: 'white/upload',
        //删除白名单接口
        whiteDelete: 'white/delete',
        //更新白名单接口
        whiteUpdate: 'white/update',
    }
};
export default action