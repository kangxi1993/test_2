var Utils = require("Utils");
var ObserverMgr = require("ObserverMgr");

cc.Class({
    extends: cc.Component,

    properties: {
        homeCenterLayer: {default: null, displayName: "大厅中心界面", type: cc.Prefab},

        roleBg: {default: null, displayName: "角色背景框", type: cc.Sprite},
        sceneBg: {default: null, displayName: "场景背景框", type: cc.Sprite},
        mailBg: {default: null, displayName: "邮件背景框", type: cc.Sprite},
        activeBg: {default: null, displayName: "活动背景框", type: cc.Sprite},
        exchangeBg: {default: null, displayName: "兑换背景框", type: cc.Sprite},
        shopBg: {default: null, displayName: "商店背景框", type: cc.Sprite},

        addNode: {default: null, displayName: "节点", type: cc.Node}
    },

    onLoad: function () {
        this._changeItemBg(0);
        this._addHomeCenterLayer();
    },

    _addHomeCenterLayer(){
        Utils.destroyChildren(this.addNode);
        var pre = cc.instantiate(this.homeCenterLayer);
        this.addNode.addChild(pre);
    },

    // 角色
    onClickRole(){
        var data = {title: '友情提示', content: '抱歉, 功能尚未开放!'};
        ObserverMgr.dispatchMsg(GameLocalMsg.Com.OnShowTips, data);
        this._changeItemBg(1);
    },

    // 场景
    onClickScene(){
        var data = {title: '友情提示', content: '抱歉, 功能尚未开放!'};
        ObserverMgr.dispatchMsg(GameLocalMsg.Com.OnShowTips, data);
        this._changeItemBg(2);
    },
    // 邮件
    onClickMail(){
        var data = {title: '友情提示', content: '抱歉, 功能尚未开放!'};
        ObserverMgr.dispatchMsg(GameLocalMsg.Com.OnShowTips, data);
        this._changeItemBg(3);
    },
    // 活动
    onClickActive(){
        var data = {title: '友情提示', content: '抱歉, 功能尚未开放!'};
        ObserverMgr.dispatchMsg(GameLocalMsg.Com.OnShowTips, data);
        this._changeItemBg(4);
    },
    // 兑换
    onClickConvert(){
        var data = {title: '友情提示', content: '抱歉, 功能尚未开放!'};
        ObserverMgr.dispatchMsg(GameLocalMsg.Com.OnShowTips, data);
        this._changeItemBg(5);
    },
    // 商店
    onClickShop(){
        var data = {title: '友情提示', content: '抱歉, 功能尚未开放!'};
        ObserverMgr.dispatchMsg(GameLocalMsg.Com.OnShowTips, data);
        this._changeItemBg(6);
    },

    _changeItemBg(index){
        this.roleBg.setVisible(false);
        this.sceneBg.setVisible(false);
        this.mailBg.setVisible(false);
        this.activeBg.setVisible(false);
        this.exchangeBg.setVisible(false);
        this.shopBg.setVisible(false);

        if (index == 1) {// 角色
            //this._clickIndexArr.push(index);
            this.roleBg.setVisible(true);
        } else if (index == 2) {// 场景
            this.sceneBg.setVisible(true);
            //this._clickIndexArr.push(index);
        } else if (index == 3) {// 邮件
            this.mailBg.setVisible(true);
            //this._clickIndexArr.push(index);
        } else if (index == 4) {// 活动, 活动的index不记录
            this.activeBg.setVisible(true);
        } else if (index == 5) {// 兑换
            this.exchangeBg.setVisible(true);
            //this._clickIndexArr.push(index);
        } else if (index == 6) {// 商城
            this.shopBg.setVisible(true);
        } else if (index == 7) {// 商城
            //itemBg都不亮
        }
    }

});
