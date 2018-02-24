/*
 * jquery-validate　默认设置
 */
$.validator.setDefaults({
    errorElement : "div",
    errorClass : "valid-error",
    highlight : function(ele){
        $(ele).closest('.form-inline').addClass('has-error');
    },
    onfocusout: function(element) { 
        $(element).valid(); 
    },
    success : function(label){
        $(label).closest('.form-inline').removeClass('has-error');
        $(label).closest('.form-inline').children('.valid-error').remove();
        $(label).closest('.form-inline').children('.valid-error').remove();
    },
    errorPlacement : function(error, element){
        var _value = $(element).val();
        element.parent('.form-inline').append(error);
    },
    submitHandler : function(){
        return false;
    },
    ignore : '.valid-ignore'
});
/**
 * 扩展jquery-validate 较验规则
 */
//非空验验
//非空验验
$.validator.addMethod('required',function(value){
    if ($.trim(value) == '' || value == undefined || value == null) {
        return false;
    }else {
        return true;
    }

// },'此处必填，不能为空');
$.extend($.validator.messages, {
    remote: "请修正此字段",
    email: "请输入有效的电子邮件地址",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入有效的数字",
    digits: "只能输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "你的输入不相同",
    extension: "请输入有效的后缀",
    maxlength: $.validator.format("最多可以输入 {0} 个字符"),
    minlength: $.validator.format("最少要输入 {0} 个字符"),
    rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
    range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
    max: $.validator.format("请输入不大于 {0} 的数值"),
    min: $.validator.format("请输入不小于 {0} 的数值")
});
//身份证号较验
$.validator.addMethod('idCard',function(value){
    if (value != '') {
        if (value.length < 18) {
            return false;
        }else if (value.length == 18) {
            if (checkIdcard(value) != 0) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true; 
},'身份证号码格式不正确');

//手机号较验
$.validator.addMethod('mobile',function(value){
    if (value != '') {
        return /^(13|15|18|17|14)\d{9}$/i.test(value); 
    } else {
        return true;
    }
},'手机号码格式不正确');


//验证电话号码
$.validator.addMethod('phone',function(value){
    if (value != '') {
        return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);  
    } else {
        return true;
    }
},'格式不正确,请使用下面格式:020-88888888');

//验证行驶公里数【非0开头的不超过8位的正整数】
$.validator.addMethod('travel',function(value){
    return /^\d{1,7}$/.test(value); 
},'请输入正确行驶公里数');

//验证姓名，可以是中文或英文
$.validator.addMethod('username',function(value){
    if (value != '') {
        return /^[\u0391-\uFFE5]+$/i.test(value)|/^\w+[\w\s]+\w+$/i.test(value);
    } else {
        return true;
    } 
},'请输入姓名');

//验证车牌号码
$.validator.addMethod('carNo',function(value){
    if (value != '') {
        return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(value);
    } else {
        return true;
    }
},'车牌号码无效（例：浙A12350）');

//车架号格式验证
$.validator.addMethod('carenergin',function(value){
    return /^[a-zA-Z0-9]{16}$/.test(value); 
},'车架号格式不正确(例：FG6H012345654584)');

//验证千分位数字
$.validator.addMethod('thousandNum',function(value){
    return /^\d{1,3}(,\d{3})*(.\d+)?$/.test(value);
},'输入的金额不正确(例：1,000)');

/**
 * 身份证号码校验
 */
function checkIdcard(idcard) {
    
    var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江", 31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北", 43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏", 61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
    
    var Y,JYM;
    var S,M;
    var idcard_array = [];
    idcard_array = idcard.split("");
    //地区检验
    if(area[parseInt(idcard.substr(0,2))]==null) return 4;
    //身份号码位数及格式检验
    switch(idcard.length){
        case 18:
            //18位身份号码检测
            //出生日期的合法性检查 
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
                ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
            } else {
                ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
            }
            if(ereg.test(idcard)){//测试出生日期的合法性
                    //计算校验位
                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                    + parseInt(idcard_array[7]) * 1 
                    + parseInt(idcard_array[8]) * 6
                    + parseInt(idcard_array[9]) * 3 ;
                    Y = S % 11;
                    M = "F";
                    JYM = "10X98765432";
                    M = JYM.substr(Y,1);//判断校验位
                    
                if(M == idcard_array[17]) return 0; //检测ID的校验位
                else return 3;
            }else return 2;
            break;
        default:
            return 1;
        break;
    }
}

