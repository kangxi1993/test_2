cc.Class({
    extends: cc.Component,

    properties: {
        MaskNode: {default: null, displayName: "Mask节点", type: cc.Node}
    },

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    },
    _onTouchStart(touch){
        var ret = this.MaskNode.getBoundingBox();
        var touchPos = touch.getLocation();
        var localPos = this.MaskNode.parent.convertToNodeSpaceAR(touchPos);
        var b = ret.contains(localPos);
        if (b) {
            console.log("点到遮罩层");
        } else {
            console.log("没点到");
            this.node._touchListener.setSwallowTouches(true)
        }
    },

    initMask(node){
        if (node) {
            var worldPos = node.parent.convertToWorldSpaceAR(node.getPosition());
            var localPos = this.node.convertToNodeSpaceAR(worldPos);

            this.MaskNode.x = localPos.x;
            this.MaskNode.y = localPos.y;
        }
    }

});
