var JsonFileCfg = require("JsonFileCfg");
var GameLocalStorage = require("GameLocalStorage");

cc.Class({
    extends: cc.Component,

    properties: {
        loginBtn: {default: null, displayName: "登录节点", type: cc.Node}
    },

    onLoad: function () {
        GameLocalStorage.initStorageData();// 读取保存到本地的配置
        JsonFileCfg.init();
        //this.loginBtn.getComponent(cc.Button).interactable = false;
        this.loginBtn.getComponent(cc.Button).enableAutoGrayEffect = true;
    },

    onClickLogin(){
        cc.director.loadScene("Game");
    }

});
