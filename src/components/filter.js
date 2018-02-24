function getValueByKey(obj, key) {
    //如果不是一个对象，则返回key
    if(typeof(obj) != 'object') return key;
    return obj[key];
}
export default {
    //转为是否冻结
    'fIsFrozen': function(value){
        return getValueByKey($.enumList.isFrozen, value);
    }
    //转为男　女
    ,'fSex': function(value){
        return getValueByKey($.enumList.sexValue, value);
    }
    //转还款方式
    ,'fRepayMode': function(value){
        return getValueByKey($.enumList.repaymentValue, value);      
    }
    // 转化为xxxx年xx月xx日
    ,'fDate': function(value){
        var _d;
        try {
            return (new Date(value)).toLocaleDateString();
        } catch(e) {
            return value;
        }
    }
    //根据返回对象paramDict转化
    ,'fDict': function(value, obj){
        if(typeof(obj) != 'object') return value;
        return obj[value];
    }
    //转化操作类型
    ,'fOrderValue': function(value) {
        return getValueByKey($.enumList.orderValue, value);   
    }
};
