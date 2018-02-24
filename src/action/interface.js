//var sessionId = '?authId=sso-348i415oac4cfc26efd15f747fb94d18eb75c77af51';
var sessionId = ''
var origin = window.location.origin + '/'
var _rootpath =  (origin =="http://192.168.28.131:8010/" || origin =="http://localhost:8010/") ? "http://clmg.wdai.com/api/" :origin == "http://clmg.fed.weidai.work/" ? "http://clmg.wdtest.cc/" :  origin+'api/'
var action = {
    rootPath : "http://192.168.92.229:3000/api/",
    //rootPath : "http://clmg.wdai.com/api/",
    //rootPath: _rootpath,
    timeout : 2000,
    method : "post",
    interface : {
        //导航
        menu: 'log/index' + sessionId,
        //新权限接口
        indexNew:'log/indexNew' + sessionId,
    	//白名单信息
        whiteQuery:'white/query' + sessionId, 
        //白名单信息2
        whiteQueryRestrict:'white/query/restrict' + sessionId, 
        //白名单操作历史
        whiteQueryhistory: 'white/queryoperation' + sessionId,
        //白名单新增接口
        whiteAdd: 'white/add' + sessionId,
        //查询单个白名单详情
        whiteOne: 'white/query/one' + sessionId,   
        //导入白名单接口
        whiteUpload: 'white/upload' + sessionId,   
        //删除白名单接口
        whiteDelete: 'white/delete' + sessionId,   
        //更新白名单接口
        whiteUpdate: 'white/update' + sessionId,  
        //白名单预览接口
        whitePreview: 'white/preview' + sessionId,   
        //白名单批量导入确认接口
        whiteConfirmAdd: 'white/confirm/add' + sessionId,   
        //白名单批量删除确认接口
        whiteConfirmDelete: 'white/confirm/delete' + sessionId,   
        //白名单批量更新额度
        whiteConfirmUpdate: 'white/confirm/update' + sessionId,   
        //贷款统计查询
        sta: 'loan/query/sta' + sessionId,
        //逾期统计查询
        overdue: 'loan/query/overdue' + sessionId,
        //名单管理
        query: 'user/query' + sessionId,
        //名单管理2
        queryRestrict: 'user/query/restrict' + sessionId,
        //名单详情
        queryone: 'user/queryone' + sessionId,
        //授信信息分页查询
        creditQuery: 'credit/query' + sessionId,
        //批量更新授信信息
        creditBatchupdate: 'credit/batchupdate' + sessionId,        
        //授信信息分页查询
        creditQueryhistory: 'credit/queryhistory' + sessionId,     
        //授信修改额度
        creditUpdate: 'credit/updateone' + sessionId,     
        //个人登录日志查询     
        queryLoginLog: 'log/queryLoginLog' + sessionId,
        //登录日志汇总
        queryLoginSummary: 'log/queryLoginSummary' + sessionId,
        //分页查询产品信息接口
        prodQuery: 'product/query' + sessionId,
        //删除产品接口
        prodDelete: 'product/delete' + sessionId,        
        //产品新增接口
        prodAdd: 'product/add' + sessionId,
        //产品查询接口
        prodList: 'conf/list/product_type_name' + sessionId,
        //产品修改接口
        prodUpdate: 'product/update' + sessionId, 
        //查询单个产品详情
        prodOne: 'product/query/one' + sessionId,        
        //启用\停用产品接口
        prodOperate: 'product/operate' + sessionId,
        //分页查询产品操作历史
        queryOperations: 'product/query/operations' + sessionId,
        //查询单个产品操作历史
        queryOperation: 'product/query/operation' + sessionId,  
         //授权管理列表查询
        queryUserCreditTag: 'userCredit/queryUserCreditTag' + sessionId,  
        //授权管理列表查询2
        queryUserCreditTagRestrict: 'userCredit/queryUserCreditTag/restrict' + sessionId,  
        //授权管理更新历史
        queryCreditTagHistory: 'userCredit/queryCreditTagHistory' + sessionId,
        //授权更新
        updateCreditTag: 'userCredit/updateCreditTag' + sessionId,
        // 查询合同列表
        queryContract: 'contract/queryPage' + sessionId, 
        //查询合同详情
        queryById: 'contract/queryById' + sessionId, 
        //根据bid查询借款人。
        investUsers: 'contract/queryInvestUserByBid' + sessionId, 
        // 借款管理列表
        loanQuery: 'loan/query' + sessionId,
        // 借款管理列表2
        loanQueryRestrict: 'loan/query/restrict' + sessionId,
        // 借款管理 - 还清借款
        loanUpdate: 'loan/update' + sessionId,
        // 贷后管理 - 还清借款
        repayUpdate: 'repay/update' + sessionId,
        // 贷后管理 - 贷后扣款查询
        repayDeduct: 'repay/query/deduct' + sessionId,
        // 贷后管理 - 贷后扣款提交
        repayDeductSave: 'repay/deductMoney' + sessionId,
        // 逾期管理
        delayQuery: 'overdue/query' + sessionId,
        //贷后信息分页查询接口
        repayQuery: 'repay/query' + sessionId,
        //贷后信息分页查询接口（只限查看）
        repayQueryRestrict: 'repay/query/restrict' + sessionId,
        //批量修改续贷最低还款比例
        loanExtendUpload: 'loanExtend/upload' + sessionId,
        loanExtendPreview: 'loanExtend/preview' + sessionId,
        loanExtendConfirm: 'loanExtend/confirm/add' + sessionId,
        loanExtendUpdate: 'loanExtend/update' + sessionId,
        loanExtendQuery: 'loanExtend/queryOne' + sessionId,

        renewedLoan:'repay/renewedLoan',


        //还款计划分页查询接口
        repayPlan: 'repay/query/plan' + sessionId,
        //还款记录查询接口
        repayRecord: 'repay/query/record' + sessionId,
        //操作日志分页查询
        logOperation: 'logOperation /query' + sessionId,

        //补标接口
        issueAgain: 'bid/issueAgain' + sessionId,
        //撤标接口
        revokeBid: 'loan/revokeBid' + sessionId,
        //续贷发标接口
        addBid: 'loan/addBid' + sessionId,
        //续贷请求接口
        repayQueryContract: 'repay/queryContract' + sessionId,
        //续贷计算
        calculateAtmount:'repay/calculateAtmount',
        //续贷提交
        renewedLoanByCapital:'repay/renewedLoanByCapital',
        //签署合同
        signContract:'repay/signContract',
        //查询ip历史信息。
        queryIPHistory: 'log/queryIPHistory' + sessionId,


        //基本个人信息
        basicInfo: 'user/query/base'  + sessionId,
        //更新紧急联系人信息
        updateLinkman:'user/update/linkMan',
        //更新用户信息
        updateBaseInfo:'user/update/baseInfo',
        //通讯录信息查询接口
        userPhoneBook: 'user/query/userPhoneBook'  + sessionId,
        //地址记录信息查询接口
        userSeat: 'user/query/userSeat'  + sessionId,
        //芝麻信用分
        zmfQuery : 'user/query/zmf'  + sessionId,
        //淘宝信息：个人信息查询接口
        taobaoBase : 'user/query/taobao/base'  + sessionId,
        //淘宝信息：收货地址查询接口
        taobaoAddress : 'user/query/taobao/address'  + sessionId,
        //淘宝信息：订单详情分页查询接口
        taobaoOrder : 'user/query/taobao/order'  + sessionId,
        //京东信息：个人信息查询接口
        jdBase : 'user/query/jd/base'  + sessionId,
        //京东信息：收货地址查询接口
        jdAddress : 'user/query/jd/address'  + sessionId,
        //京东信息：订单详情分页查询接口
        jdOrder : 'user/query/jd/order'  + sessionId,
        //京东信息：订单详情分页查询接口
        jdWealth : 'user/query/jd/wealth'  + sessionId,
        //审核运营商信息：个人手机信息查询接口
        yysMobile : 'user/query/yys/mobile' + sessionId,
        //审核运营商信息：通话详单分页查询接口
        yysCallog : 'user/query/yys/calllog' + sessionId,
        //贷款信息查询接口
        queryLoanInfo : 'user/query/loanInfo' + sessionId,
        //复审意见审核
        queryLog : 'user/queryLog' + sessionId,
        //初审意见审核。
        firstTrial : 'user/firstTrial' + sessionId,
        //复审意见审核。
        retrial : 'user/retrial' + sessionId,
        //查看已办初审跟踪流程信息接口\查看初审意见接口\查看复审意见接口
        process : 'userquery/process' + sessionId,
        //支付宝信息：基本信息查询接口
        zfbBase : 'user/query/alipay/base' + sessionId,
        //支付宝信息：财富信息查询接口
        zfbWealth : 'user/query/alipay/wealth' + sessionId,
        //支付宝信息：财富交易记录查询接口
        zfbRecord : 'user/query/alipay/order' + sessionId,

        //查询客服列表
        queryUserList: 'usern/queryUserList' + sessionId,
        //重新分配客服
        reallocateTask: 'usern/reallocateTask' + sessionId,
        //查询用户照片接口
        queryUserPhoto: 'user/queryUserPhoto' + sessionId,
        //查询风险白名单列表
        riskWhiteQuery: 'riskWhite/query' + sessionId,
        //查询风险白名单
        riskWhite: 'riskWhite/query/one' + sessionId,
        //查询风险白名单操作历史
        riskHistory: 'riskWhite/query/operation' + sessionId,
        //新增风险白名单
        addRiskWhite: 'riskWhite/add' + sessionId,
        //删除风险白名单
        riskDelete: 'riskWhite/delete' + sessionId,
        //导入风险名单接口
        riskUpload: 'riskWhite/upload' + sessionId, 
        //名单批量导入预览接口
        riskPreview: 'riskWhite/preview' + sessionId, 
        //名单批量导入确认接口
        addConfirm: 'riskWhite/confirm/add' + sessionId,  
        //名单批量删除确认接口
        deleteConfirm: 'riskWhite/confirm/delete' + sessionId,  
        //审核统计查询接口
        auditInfoSta: 'auditInfo/querySta' + sessionId,  
        //审核日志查询接口
        auditInfoLog: 'auditInfo/queryLog' + sessionId,  
        //客户反馈
        queryUserFeedback: 'feedback/queryUserFeedback',

        //banner配置查询接口
        bannerQuery:'banner/query',
        //banner新增
        bannerAdd:'banner/addBanner',
        //banner内容新增
        bannerInfoAdd:'banner/addContent',
        //banner图片上传
        uploadImg:'banner/addImage',
        //banner图片删除
        deleteImage:'banner/deleteImage',
        //banner删除
        bannerDelete:'banner/delete',
        //banner修改
        bannerUpdate:'banner/updateBanner',
        //banner模块查询接口
        queryModel:'discover/queryModel',
        //banner模块新增
        addModel:'discover/addModel',
        //banner模块删除
        deleteModel:'discover/deleteModel',
        //banner模块修改
        updateModel:'discover/updateModel',
        //banner素材查询接口
        queryElement:'discover/queryElement',
        //banner素材新增
        addElement:'discover/addElement',
        //banner素材删除
        deleteElement:'discover/deleteElement',
        //banner素材修改
        updateElement:'discover/updateElement',
        //新增位置
        addPlaces:'banner/addPlaces',
        //获取位置列表
        queryPlaces:'banner/queryPlaces',

        //加急券配置
        ticketList:'ticket/list',
        //新增加急券
        ticketAdd:'ticket/add',
        //更新加急券
        ticketUpdate:'ticket/update',
        //加急券客户批量导入
        ticketUpload:'ticket/user/batchUpload',
        //加急券客户批量删除
        ticketDelete:'ticket/user/batchDelete',
        //新增客户
        ticketUserAdd:'ticket/user/add',
        //删除客户
        ticketUserDelete:'ticket/user/delete',
        //客户优惠券关联关系分页查询
        ticketUserList:'ticket/user/list',
        //dir-config配置
        dirConfigList:'conf/list',
        //配置name列表
        nameListUrl:'conf/names',
        //重建缓存
        dirConfigrebuild:'conf/rebuild',
        //保存
        dirConfigupdate:'conf/update',
        //IVR记录
        ivrRecordTask:'ivrRecord/query/task',     
        //IVR记录详情
        ivrRecordDetail:'ivrRecord/query/record',  
        //查询系统公告和活动公告
        letterQuery:'letter/query',   
        //发布系统公告和活动公告
        letterAdd:'letter/add',
        //上传附件
        letterUpload:'letter/upload',
        //查询系统公告和活动公告
        letterDelete:'letter/delete', 

    }
};
export default action