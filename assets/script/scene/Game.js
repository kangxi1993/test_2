cc.Class({
    extends: cc.Component,

    properties: {
        bgNode: {default: null, displayName: "背景节点", type: cc.Node},
        plane: {default: null, displayName: "主机", type: cc.Prefab},
        planeNode: {default: null, displayName: "节点", type: cc.Node},
        speed: 2

    },

    onLoad: function () {
        this.addPlane();

        this.node.on(cc.Node.EventType.TOUCH_START, this._onStartTouch, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onMoveTouch, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onEndTouch, this);

    },

    _onStartTouch(event){

    },

    _onMoveTouch(event){
        cc.log("移动");
        let worldPos = event.getLocation();
        let localPos = this.node.convertToNodeSpaceAR(worldPos);
        this.planeNode.setPosition(localPos);
    },

    _onEndTouch(event){
        cc.log(event.type);
    },

    addPlane(){
        var plane = cc.instantiate(this.plane);
        this.planeNode.addChild(plane);
    },

    update (dt) {
        this.bgNode.setPositionY(this.bgNode.getPositionY() + this.speed);
        if (this.bgNode.getPositionY() >= 1280) {
            //this.bgNode.setPositionY(this.bgNode.getPositionY() - this.bgNode.getContentSize().height * 2);
            this.bgNode.setPositionY(640);
        }
    }

});
