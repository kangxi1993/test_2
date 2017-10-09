// 本地缓存全部做成一个字符串
module.exports = {
    // todo 通用存储,账号存储
    catchKey: "catchKey",
    catchData: {
        // 仅仅只是缓存
        userName: null,// 用户名
        roleType: 0,
        showRaceRuleCount: 0,// 展示比赛场游戏规则次数
        localVersion: "",
        remoteVersion: "",

        // 跟游戏设置有关缓存
        musicVoice: 0,
        musicIsOn: true,
        soundVoice: 0,
        soundIsOn: true,
        putCardBtnSeq: 1,// 出牌按钮顺序
        IAPSuccessToken: [],// 内购成功token值
    },
    ///////////////////////////////////////////////////////////
    setName(name){
        this.catchData.userName = name;
        this.save();
    },
    getName(){
        return this.catchData.userName;
    },
    setType(type){
        this.catchData.roleType = type;
        this.save();
    },
    getType(){
        return this.catchData.roleType;
    },
    setIAPSuccessToken(token){
        this.catchData.IAPSuccessToken.push(token);
        this.save();
    },
    delIAPToken(token){
        var index = this.getIndexOf(token);
        if (index > -1) {
            this.catchData.IAPSuccessToken.splice(index, 1);
        }
        this.save();
    },
    getIndexOf(token){
        for (var k in this.catchData.IAPSuccessToken) {
            if (this.catchData.IAPSuccessToken[k] == token) {
                return k;
            }
        }
        return -1;
    },
    addShowRaceRleCount(){
        var num = this.catchData.showRaceRuleCount++;
        this.catchData.showRaceRuleCount = num;
        this.save();
    },
    getIsShowRaceRuleCount(){
        return this.catchData.showRaceRuleCount;
    },

    getLocalVersion(){
        return this.catchData.localVersion.toString();
    },
    getRemoteVersion(){
        return this.catchData.remoteVersion.toString();
    },
    setVersion(local, remote){
        this.catchData.localVersion = local;
        this.catchData.remoteVersion = remote;
        this.save();
    },

    ///////////////////////////////////////////////////////////
    _isInit: false,
    initStorageData(){
        if (this._isInit == false) {
            this._isInit = true;
            var saveStr = cc.sys.localStorage.getItem(this.catchKey);
            if (saveStr) {
                var saveObj = JSON.parse(saveStr);

                this.catchData.userName = saveObj.userName || "";
                this.catchData.roleType = saveObj.roleType || "";
                this.catchData.showRaceRuleCount = saveObj.showRaceRuleCount;
                this.catchData.localVersion = saveObj.localVersion || "";
                this.catchData.remoteVersion = saveObj.remoteVersion || "";
            } else {// 第一次玩
            }
        } else {
            console.log("[GameLocalStorage] has init");
        }
    },


    save(){
        var saveStr = JSON.stringify(this.catchData);
        cc.sys.localStorage.setItem(this.catchKey, saveStr);
    },

    clean(){
        this.catchData.userName = null;
        this.save();
    }

};
