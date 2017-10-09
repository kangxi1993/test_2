var JsonFileMgr = require("JsonFileMgr");
var ObserverMgr = require("ObserverMgr");
var Observer = require("Observer");
var GameLocalStorage = require("GameLocalStorage");

cc.Class({
    extends: Observer,

    properties: {
        roleNode1: {default: null, displayName: "角色1", type: cc.Node},
        roleNode2: {default: null, displayName: "角色2", type: cc.Node},
        roleNode3: {default: null, displayName: "角色3", type: cc.Node},
        roleNode4: {default: null, displayName: "角色4", type: cc.Node},
        editBox: {default: null, displayName: "名字框", type: cc.EditBox},
        _roleIndex: 1,// 角色索引
    },


    onLoad: function () {
        this.onClickRole(null, "1");
    },

    onClickRole(node, data){
        var type = data;
        this.roleNode1.color = type == "1" ? cc.Color.WHITE : cc.Color.BLACK;
        this.roleNode2.color = type == "2" ? cc.Color.WHITE : cc.Color.BLACK;
        this.roleNode3.color = type == "3" ? cc.Color.WHITE : cc.Color.BLACK;
        this.roleNode4.color = type == "4" ? cc.Color.WHITE : cc.Color.BLACK;
        GameLocalStorage.setType(type);
    },

    // 随机名字
    randName(node){
        var rotate = new cc.RotateBy(0.15, 360);
        node.target.rotation = 0;
        node.target.stopAllActions();
        node.target.runAction(rotate);

        this.editBox.string = JsonFileMgr.getRandName();
    },

    onClickEnter(){
        var strName = this.editBox.string;
        if (strName.length < 2) {
            this.editBox.string = '';
            this.editBox.placeholder = JsonFileMgr.getErrString(4001);
            return;
        }
        if (strName.length > 6) {
            this.editBox.string = '';
            this.editBox.placeholder = JsonFileMgr.getErrString(4002);
            return;
        }
        var b = JsonFileMgr.isContentForbidWord(strName);
        if (b) {
            this.editBox.string = '';
            this.editBox.placeholder = JsonFileMgr.getErrString(4003);
            return;
        }

        var nameRule = /^[0-9a-zA-Z\u0800-\u9fa5-]+$/;
        if (strName != '' && nameRule.test(strName) == true) {
            var roleData = JsonFileMgr.getRoleDataById(this._roleIndex);
            var roleId = roleData['roleId'];
            GameLocalStorage.setName(strName);
            var data = {name: encodeURI(strName), img: roleId};
            ObserverMgr.dispatchMsg(GameLocalMsg.Center.GetUserInfo, null);
            this.close();
        } else {
            this.editBox.string = '';
            this.editBox.placeholder = JsonFileMgr.getErrString(4004);
        }
    },

    close(){
        this.node.destroy();
    }

});
