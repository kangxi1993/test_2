cc.Class({
    extends: cc.Component,

    properties: {
        labMsg: {default: null, displayName: "提示", type: cc.Label},
        btnOk: {default: null, displayName: "OK按钮", type: cc.Node},
        btnCancel: {default: null, displayName: "取消按钮", type: cc.Node},
        btnIKnow: {default: null, displayName: "我知道了按钮", type: cc.Node},
        _callbackCancel: null,
        _callbackOK: null,
        _callbackIKnow: null
    },

    onLoad: function () {

    },

    showMsgWithIKnow(title, content, callback){
        this.labMsg.string = content;
        this.btnIKnow.active = true;
        this.btnCancel.active = false;
        this.btnOk.active = false;

        if (typeof callback == "function") {
            this._callbackIKnow = _this ? callback.bind(_this) : callback;
        }
    },

    onClickIKnow(){
        if (this._callbackIKnow) {
            this._callbackIKnow();
        }
        this.node.destroy();
    }

});
