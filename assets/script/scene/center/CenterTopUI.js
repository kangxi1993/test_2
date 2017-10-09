var Observer = require("Observer");
var GameLocalStorage = require("GameLocalStorage");
var ObserverMgr = require("ObserverMgr");
var JsonFileMgr = require("JsonFileMgr");
var ImgMgr = require("ImgMgr");

cc.Class({
    extends: Observer,

    properties: {
        head: {default: null, displayName: "头像", type: cc.Sprite},
        userName: {default: null, displayName: "用户名Label", type: cc.Label}
    },

    _getMsgList(){
        return [
            GameLocalMsg.Center.GetUserInfo
        ]
    },

    _onMsg(msg, data){
        if (msg == GameLocalMsg.Center.GetUserInfo) {
            this.setNameAndHead();
        }
    },

    onLoad: function () {
        this._initMsg();
        ObserverMgr.dispatchMsg(GameLocalMsg.Center.GetUserInfo, null);
    },

    setNameAndHead(){
        var nameStr = GameLocalStorage.getName();
        var name = decodeURI(nameStr);
        this.userName.string = name;

        var roleType = GameLocalStorage.getType();
        var url = JsonFileMgr.getRoleHeadImgUrl(roleType);
        ImgMgr.setImg(this.head, url);
    }

});
