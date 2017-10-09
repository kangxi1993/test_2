// 加载动态图片
// url 必须是相对resources的路径,不能带扩展名
// 物理路径为:resources/bg/scene1.png
//
module.exports = {
    setImg(sprite, url){
        if (sprite == null || url == null) {
            return;
        }

        cc.loader.loadRes(url, cc.SpriteFrame, function (err, frame) {
            if (!err) {
                sprite.spriteFrame = frame;
            } else {
                console.log(err);
            }
        });
    },
}