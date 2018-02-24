
export default {
    methods: {
        // 以百分号显示
        toPercent(value) {
            //转化为浮点，是否为数字
            let _v = parseFloat(value)
            if (!isNaN(_v)) {
                return (_v * 100).toFixed(4);
            } else {
                return value;
            }
        }
        , percentToFloat(percent) { //百分号输入转化为浮点，如20 => 0.2
            let _v = parseFloat(percent)
            if (!isNaN(_v)) {
                return _v / 100;
            } else {
                return _v;
            }
        }
        //根据周期类型及周期数，显示周期
        //@params: cycle周期数，cycleUnit周期类型
        , showCycle(cycle, cycleUnit) {
            var showUnit = '';
            if (cycle == undefined || cycleUnit == undefined) return '';
            if (cycleUnit == 0) {
                showUnit = '天';
            } else {
                showUnit = '个月';
            }
            return cycle + showUnit;
        }
        //时间戳格式化
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
        , fDate(_date, fmt) {
            //先转化为数字
            let _d = parseInt(_date)
            if (isNaN(_d)) return _date
            let _fDate = new Date(_d)
            var o = {
                "M+": _fDate.getMonth() + 1, //月份 
                "d+": _fDate.getDate(), //日 
                "h+": _fDate.getHours(), //小时 
                "m+": _fDate.getMinutes(), //分 
                "s+": _fDate.getSeconds(), //秒 
                "q+": Math.floor((_fDate.getMonth() + 3) / 3), //季度 
                "S": _fDate.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_fDate.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        //以＂,＂格式化金额，n表示小数位数 , s表示金额
        , fMoney(s, n) {
            n = n > 0 && n <= 20 ? n : 2;
            //如果S为空返回0
            if (!s) {
                return 0;
            }
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        }
        //恢复金额至格式化前
        , rMoney(fm) {
            if (typeof (fm) == 'number') return fm;
            return parseFloat(fm.replace(/[^\d\.-]/g, ""));
        }
        //计算时间差值
        //return 差值，单位为ms
        , getDateDiff(startDate, endDate) {
            try {
                var sDate = new Date(startDate),
                    eDate = new Date(endDate);
                return (eDate - sDate);
            } catch (e) { }
        }
        //计算时间差值,并格式化(N个月N天)
        , fDateDiff(startDate, endDate) {
            var diff = this.getDateDiff(startDate, endDate);
            diff = parseInt(diff);
            if (typeof (diff) != 'number') return '';
            diff = parseInt(diff / (1000 * 60 * 60 * 24));
            var month = Math.floor(diff / 30),
                day = diff % 30;
            month = (month > 0) ? (month + "个月") : "";
            day = (day > 0) ? (day + "天") : "";
            return (month + day);
        }
        //dict.js格式转化
        , getDictValue(key, obj) {
            //如果不是一个对象，则返回key
            if (typeof (obj) != 'object') return key;
            if (key === '' || key == 'undefined') return key;
            key = '' + key;
            return obj[key];
        }

        //请求提交失败
        , error(msg) {
            eventHub.$emit('show-alert', msg);
        }
        //get发送数据请求
        , send(url, params, callback, errorcall) {
            if (url == 'undefined' || url == '' || typeof (params) != 'object') return;
            //打开进度条
            $('#loading').show();
            this.$http({
                'method': 'get',
                //'headers': { "X-Requested-With": "XMLHttpRequest" },
                'emulateJSON': true,
                'url': url,
                'params': params
            }).then((response) => {
                //关闭进度条
                $('#loading').hide();
                //处理回调
                callback(response.data);
                //callback(JSON.parse(response.data));
            }, (response) => {
                $('#loading').hide();
                //如果有回调，处理回调，否则默认处理。
                if (typeof (errorcall) == 'function') {
                    errorcall(response);
                } else {
                    this.error('请求提交失败，请联系管理员')
                }
            })
        }
        , post(url, params, callback, errorcall) { //post 方式发送数据请坟
            if (url == 'undefined' || url == '' || typeof (params) != 'object') return;
            //打开进度条
            $('#loading').show();
            this.$http.post(url, params, {
                headers: { "X-Requested-With": "XMLHttpRequest" }, 
                emulateJSON: true, 
                //credentials: true //针对指定域名
            }).then((response) => {
                //关闭进度条
                $('#loading').hide();
                //处理回调
                callback(response.data);
                //callback(JSON.parse(response.data));
            }, (response) => {
                $('#loading').hide();
                //如果有回调，处理回调，否则默认处理。
                if (typeof (errorcall) == 'function') {
                    errorcall(response);
                } else {
                    this.error('请求提交失败，请联系管理员')
                }
            })
        }
        //入参字段为空判断
        , postNew(url, params, callback, errorcall) { //post 方式发送数据请坟
            if (url == 'undefined' || url == '' || typeof (params) != 'object') return;
            //打开进度条
            $('#loading').show();
            const newData = params;
            //处理入参为空的情况
            for (const key in newData) {
                if (newData[key] === undefined || newData[key] == null || newData[key] === '') {
                    delete newData[key];
                }
            }
            this.$http.post(url, params, { headers: { "X-Requested-With": "XMLHttpRequest" }, 'emulateJSON': true, credentials: true }).then((response) => {
                //关闭进度条
                $('#loading').hide();
                //处理回调
                callback(response.data);
                //callback(JSON.parse(response.data));
            }, (response) => {
                $('#loading').hide();
                //如果有回调，处理回调，否则默认处理。
                if (typeof (errorcall) == 'function') {
                    errorcall(response);
                } else {
                    this.error('请求提交失败，请联系管理员')
                }
            })
        }
        //计算分页偏移量，pageNum当前第几页， pageSize一个几个
        , cptOffset(pageNum, pageSize) {
            let num = parseFloat(pageNum);
            let size = parseFloat(pageSize);
            if (!isNaN(num) && !isNaN(size)) {
                return (num - 1) * size;
            } else {
                return 0;
            }
        }
        /* 表格查询，分页等处理，统计data: pageNum, url, qParams; 统一设置errorInfo(错误信息)， reDataList （返回数据列表）, total （数据总条数） --start*/
        //跳转至N页
        , goPage(num) {
            //如果num为当前页，则不做处理
            num = parseInt(num)
            if (isNaN(num) || num == this.pageNum) return
            this.pageNum = num
            this.doQuery()
        }
        //点击查询
        , clickQuery() {
            //点查询都为第一页
            this.pageNum = 1;
            this.doQuery();
        }
        //查询数据
        , doQuery() {
            let vm = this
            let _params = this.qParams
            vm.post(vm.url, _params, function (res) {
                if (res.code == 0 && res.data) {
                    if (res.data.data && res.data.data.length >= 0) {
                        vm.reDataList = res.data.data
                        vm.errorInfo = res.data.data.length > 0 ? "" : "(无数据)"
                        if (vm.errorInfo) {
                            $(".noData").css("display", "block")
                        } else {
                            $(".noData").css("display", "none")
                        }
                        if (res.data.count) {
                            vm.total = res.data.count
                        } else if (res.data.total) {
                            vm.total = res.data.total
                        } else {
                            vm.total = 0
                        }
                    } else {
                        if (res.data.count != null) {
                            vm.total = res.data.count
                        } else {
                            vm.reDataList = res.data
                        }
                    }
                } else if (res.code == 0 && !res.data) { //无数据
                    vm.errorInfo = "暂无数据"
                } else { //返回异常信息
                    vm.errorInfo = res.message
                    vm.reDataList = []
                }
            })
        }
        //查询按钮数据
        , showBtn(name, btnName) {
            if (window.btnList) {
                for (const x of window.btnList) {
                    if (x.name == name) {
                        for (const t of x.children) {
                            if (t.name == btnName) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        /**
         * 时间戳转换时间格式yy-mm-dd hh-ii-ss
         *@param{Object}time
         */
        , timeNormal(time) {
            var now = new Date(parseInt(time));
            var yy = now.getFullYear(); //年
            var mm = now.getMonth() + 1; //月
            var dd = now.getDate(); //日
            var hh = now.getHours(); //时
            var ii = now.getMinutes(); //分
            var ss = now.getSeconds(); //秒
            var clock = yy + "-";
            if (mm < 10) clock += "0";
            clock += mm + "-";
            if (dd < 10) clock += "0";
            clock += dd + " ";
            if (hh < 10) clock += "0";
            clock += hh + ":";
            if (ii < 10) clock += "0";
            clock += ii + ":";
            if (ss < 10) clock += "0";
            clock += ss + " ";
            return clock;
        }
        /**
         * 秒转换时间格式hh-ii-ss
         *@param{Object}time
         */
        , timeSecond(time) {
            var hh = parseInt(time / 3600); //时
            var ii = parseInt((time - hh * 3600) / 60); //分
            var ss = parseInt((time - hh * 3600) % 60); //秒
            //var clock = hh + "-";
            var clock;
            if (hh < 10) hh = "0" + hh;
            clock = hh + ":";
            if (ii < 10) clock += "0";
            clock += ii + ":";
            if (ss < 10) clock += "0";
            clock += ss + " ";
            return clock;
        }
        /**
         * 查询条件权限
         *@param navName
         *@param condition
         */
        , hasSearch(navName, condition) {
            let flag = false;
            let list = window.clmgList;
            list = list.filter(x => x.name == "查询条件")
            if (list.length > 0) {
                list = list[0].children.filter(x => x.name == navName);
                if (list.length > 0) {
                    if (list[0].children.filter(x => x.name == condition).length > 0) {
                        flag = true;
                    }
                }
            }
            return flag;
        }
        /**
         * 按钮权限
         * @param navName
         * @param btnName
         */
        , hasBtn(navName, btnName) {
            let flag = false;
            let list = window.clmgList;
            list = list.filter(x => x.name == "按钮")
            if (list.length > 0) {
                list = list[0].children.filter(x => x.name == navName);
                if (list.length > 0) {
                    if (list[0].children.filter(x => x.name == btnName).length > 0) {
                        flag = true;
                    }
                }
            }
            return flag;
        }


    }
    , activated() {
        //监听go-page事件
        eventHub.$on('go-page', this.goPage);
        //监听do-query查询事件
        eventHub.$on('do-query', this.clickQuery);
        //监听do-refresh刷新事件
        eventHub.$on('do-refresh', this.doQuery);

    }
    , deactivated() {
        //监听go-page事件
        eventHub.$off('go-page');
        //监听do-query查询事件
        eventHub.$off('do-query');
        //监听do-refresh刷新事件
        eventHub.$off('do-refresh');
    }
    , beforeDestroy() {
        //在销毁组件时，解除表单提交的事件绑定
        eventHub.$off('do-save')
        eventHub.$off('go-back')
    }
};
