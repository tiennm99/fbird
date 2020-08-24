var MenuScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var menu = new GameMenu();
    this.addChild(menu);
  }
});

var PlayScene = cc.Scene.extend({
  backGround: null,
  onEnter: function () {
    this._super();

    //let ground = new Ground(0,0);
    //this.addChild(ground, 0);
    //var sky = new Sky(0, size.height/2);
    //this.addChild(sky, 0);
    this.backGround = new BackGround();
    //backGround.setPosition(-size.width * 0.1, 0);
    let gamePlay = new GamePlay();
    let scoreInfo = new ScoreInfo();
    this.addChild(this.backGround, 0);
    this.addChild(gamePlay, 1);
    this.addChild(scoreInfo, 2);
    //var testLayer = new TestLayer();
    //this.addChild(testLayer);
  }
});

//var TestLayer = cc.Layer.extend({
//	ctor: function() {
//		this._super();
//		var upColumn = new cc.Sprite(res.upColumn_png);
//		upColumn.setPosition(size.width * 1/3, size.height * 1/2 + upColumn.height/2);
//		this.addChild(upColumn);
//		var colBox = upColumn.getBoundingBox();
//		var w = colBox.width;
//		var h = colBox.height;
//		var colRect = cc.DrawNode.create();
//		colRect.drawRect(
//			cc.p(colBox.x, colBox.y),
//			cc.p(colBox.x + w, colBox.y + h),
//			cc.color(0, 255, 0, 255)
//		);
//		this.addChild(colRect);
//		return true;
//	}
//});
