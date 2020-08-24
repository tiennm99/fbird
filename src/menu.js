var GameMenu = cc.Layer.extend({
  ctor: function () {
    this._super();

//    this.setTouchEnabled(true);
//    this.setTouchPriority(cc.MENU_HANDLER_PRIORITY + 1);
//    this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
    //var startButton = new cc.Sprite(res.start_png);
    //var playButton = new cc.MenuItemSprite(startButton, null, this.play, this);
    //var playButton = new cc.MenuItemFont("Play", this.play());
    var name = new cc.MenuItemFont("FBIRD");
    name.setFontSize(50);
    name.setEnabled(false);

    var startButton = new cc.MenuItemImage(res.start_png, res.startSelected_png, this.play);

    var exitButton = new cc.MenuItemFont("Exit", this.exit);
    exitButton.setFontSize(30);

    var score = new ScoreInfo();
    this.addChild(score,2);

    var clearHSButton = new cc.MenuItemFont("Clear Highscore", this.clearHighScore);
    clearHSButton.setFontSize(30);

    var menu = new cc.Menu(name, startButton, clearHSButton, exitButton);
    menu.alignItemsVerticallyWithPadding(50);
    menu.setPosition(size.width / 2, size.height / 2);
    this.addChild(menu, 1);

    var background = new BackGround();
    this.addChild(background, 0);

    var bird = new cc.Sprite(res.flap_png);
    bird.setPosition(size.width * 0.1, size.height * 0.5);

    var animation = new cc.Animation();
    animation.addSpriteFrameWithFile(res.flap_png);
    animation.addSpriteFrameWithFile(res.fall_png);
//    animation.addSpriteFrameWithFile(res.downFlap_png);
//    animation.addSpriteFrameWithFile(res.midFlap_png);
//    animation.addSpriteFrameWithFile(res.upFlap_png);
//    animation.addSpriteFrameWithFile(res.midFlap_png);
    animation.setDelayPerUnit(0.1);
    animation.setRestoreOriginalFrame(true);
    var action = cc.animate(animation);
    bird.runAction(cc.repeatForever(action));

    this.addChild(bird, 2);
    //startButton.setPosition(size.width/2, size.height/2);
    //this.addChild(startButton);
    //this.scheduleUpdate();
    //return true;
  },

  play: function () {
    var nextScene = new cc.TransitionFade(1.5, new PlayScene(), cc.color(0, 0, 0));
    cc.director.runScene(nextScene);
  },
  clearHighScore: function () {
    highScore = 0;
  },
  exit: function () {
    ls.setItem(hsKey, highScore);
    cc.director.end();
  }
});
