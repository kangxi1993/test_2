cc.Class({
    extends: cc.Component,

    properties: {
        spokenNode: {default: null, displayName: "骨骼动画", type: cc.Node},
        spokenNode1: {default: null, displayName: "Node节点", type: cc.Node},
        speed: 0// 角色行走速度
    },

    onLoad: function () {

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                self._onKeyPressed(keyCode, event);
            }
        }, self.node);

        //var url =
        //cc._canvas.style.cursor = 'pointer';


        this.node.on(cc.Node.EventType.TOUCH_START, this._onStartTouch, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onMoveTouch, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onEndTouch, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this._onMouseMove, this);
    },

    _onStartTouch(event){

    },

    _onMoveTouch(event){
        let ret = this.spokenNode1.getBoundingBox();
        let worldPos = event.getLocation();
        let localPos = this.node.convertToNodeSpaceAR(worldPos);
        let b = ret.contains(localPos);
        if (b) {
            cc._canvas.style.cursor = 'pointer';
        } else {
            cc._canvas.style.cursor = 'crosshair';
        }
    },

    _onMouseMove(event){
        let ret = this.spokenNode1.getBoundingBox();
        let worldPos = event.getLocation();
        let localPos = this.node.convertToNodeSpaceAR(worldPos);
        let b = ret.contains(localPos);
        if (b) {
            cc._canvas.style.cursor = 'pointer';
        } else {
            cc._canvas.style.cursor = 'crosshair';
        }
    },

    _onEndTouch(event){
        let rolePos = this.spokenNode.getPosition();
        let worldPos = event.getLocation();
        let localPos = this.node.convertToNodeSpaceAR(worldPos);

        if (localPos.x < rolePos.x) {
            this.spokenNode.setScaleX(-0.2);
        } else {
            this.spokenNode.setScaleX(0.2);
        }

        let xdiff = rolePos.x - localPos.x;
        let ydiff = rolePos.y - localPos.y;
        let dis = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
        cc.log(dis);
        let time = dis / this.speed;

        let move = new cc.MoveTo(time, localPos);
        let callBack = new cc.CallFunc(function () {
            this.spokenNode.getComponent(sp.Skeleton).setAnimation(0, 'gungrab', true);
        }, this);
        //let seq = new cc.Sequence([move, callBack]);
        this.spokenNode.runAction(move);
    },


    _onKeyPressed: function (keyCode, event) {
        switch (keyCode) {
            case cc.KEY.up:
                cc.log("向上");
                break;
            case cc.KEY.down:
                cc.log("向下");
                break;
            case cc.KEY.left:
                cc.log("向左");
                break;
            case cc.KEY.right:
                cc.log("向右");
                break;
            default:
                return;
        }
    },

});
