var GameLocalStorage = require("GameLocalStorage");
var JsonFileMgr = require("JsonFileMgr");
var Utils = require("Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        roleNode: {default: null, displayName: "角色节点", type: cc.Node}
    },

    onLoad: function () {
        this.playRoleAnimate();
    },

    playRoleAnimate(){
        var img = GameLocalStorage.getType();
        var roleData = JsonFileMgr.getRoleDataByRoleId(img);
        if (roleData && roleData['spine']) {
            var spine = roleData['spine'];
            cc.loader.loadRes(spine, function (err, prefab) {
                if (!err) {
                    if (this._spine == null) {
                        var animate = cc.instantiate(prefab);
                        Utils.destroyChildren(this.roleNode);
                        this.roleNode.addChild(animate);
                        animate.getComponent(sp.Skeleton).setAnimation(0, 'center', true);
                        this._spine = animate;
                    } else {
                        console.log("已经创建过spine动画了");
                    }
                }
            }.bind(this));
        }
    }

});
