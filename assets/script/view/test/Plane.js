cc.Class({
    extends: cc.Component,

    properties: {
        ws: null
    },

    onLoad: function () {
        this.ws = new WebSocket('ws://localhost:8080');
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.omError.bind(this);
    },

    onOpen(){
        cc.log("on Open");
    },

    onMessage(){
        cc.log("on Message");
    }

});
