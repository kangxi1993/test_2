var ObserverMgr = require("ObserverMgr");
var Observer = require("Observer");
var GameLocalStorage = require("GameLocalStorage");
var Utils = require("Utils");

cc.Class({
    extends: Observer,

    properties: {
        pbTipMsg: {default: null, displayName: "提示消息", type: cc.Prefab},
        gameModeNode: {default: null, displayName: "模式节点", type: cc.Node},
        createRole: {default: null, displayName: "创建角色", type: cc.Prefab},
        homePre: {default: null, displayName: "大厅界面", type: cc.Prefab},
        topNode: {default: null, displayName: "顶部节点", type: cc.Node},
        clickNode: {default: null, displayName: "测试Node", type: cc.Node},
        guideMaskLayer: {default: null, displayName: "引导遮罩", type: cc.Prefab},
    },

    _getMsgList(){
        return [
            GameLocalMsg.Center.GetSysCfg,
            GameLocalMsg.Com.OnShowTips
        ]
    },

    _onMsg(msg, data){
        if (msg == GameLocalMsg.Center.GetSysCfg) {
            this._onGetSysCfgBack();
        } else if (msg == GameLocalMsg.Com.OnShowTips) {
            var title = data.title;
            var content = data.content;
            //Utils.destroyChildren(this.topNode);
            //var tmp = cc.instantiate(this.pbTipMsg);
            //tmp.getComponent('TipMsg').showMsgWithIKnow(title, content);
            //this.topNode.addChild(tmp);
            Utils.showIKnowDlg(title, content);
        }
    },

    onLoad: function () {
        this._initMsg();
        ObserverMgr.dispatchMsg(GameLocalMsg.Center.GetSysCfg, null);
        this._addMaskLayer();
    },

    _addMaskLayer(){
        let pbRole = cc.instantiate(this.guideMaskLayer);
        this.topNode.addChild(pbRole);
        let script = pbRole.getComponent("GuideMask");
        if (script) {
            script.initMask(this.clickNode);
        }
    },

    _onGetSysCfgBack(){
        // 创建角色 放在获取系统配置之后的原因是因为引导会直接跳转到U钻场选择界面,需要U钻场配置信息
        var name = GameLocalStorage.getName();
        //if (name.length <= 0) {
        if (name == null || name == "") {
            let pbRole = cc.instantiate(this.createRole);
            this.topNode.addChild(pbRole);
            //this.changeMode(Poker.GameMode.Home);
        } else {
            //var strName = GameLocalStorage.getName();
            //var data = {name: encodeURI(strName)};
            //ObserverMgr.dispatchMsg(GameLocalMsg.Center.SetNameAndHead, data);
            this.addHomeLayer();
        }
    },

    onExitHome(){
        if (cc.sys.isBrowser) {
            cc.director.loadScene("Login");
        } else if (cc.sys.isNative) {
            cc.director.loadScene("Login");
        }
    },

    addHomeLayer(){
        Utils.destroyChildren(this.gameModeNode);
        var clone = cc.instantiate(this.homePre);
        this.gameModeNode.addChild(clone);
    }

});
