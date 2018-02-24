import { getQuery } from "src/url/query";
import "src/typo/typo";
import "src/closeButton";
import "src/icon/icon.less";
import $ = require("src/jquery");
import NavBar from "src/navBar";
import Dialog from "src/dialog";
import "src/project/core";

const apis: any = {};
apis.uat = apis.prd = "/api";
apis.dev = apis.fat = "http://rule.wdtest.cc:8224";

const env = getQuery("env") || (/weidai\.com\.cn/.test(location.host) ? "prd" :
    /wdai\.com/.test(location.host) ? "uat" :
        /weidai\.work/.test(location.host) ? "fat" :
            /192|127|localhost/.test(location.host) ? "dev" : "prd");
const api = getQuery("api") || getQuery("restful");
window["G_CONFIG"] = {
    mock: "../mock",
    restful: api ? "http://" + api : apis[env]
};

$(() => {
    const navBar = new NavBar();
    navBar.elem = $(".x-navbar")[0];
});
