var Bird = cc.Sprite.extend({
  ctor: function () {
    this._super(res.fall_png);

    this.setPosition(size.width * 0.2, size.height * 0.5);
    this.setAnchorPoint(0.4, 0.5);

//    var animation = new cc.Animation();
//    animation.addSpriteFrameWithFile(res.downFlap_png);
//    animation.addSpriteFrameWithFile(res.midFlap_png);
//    animation.addSpriteFrameWithFile(res.upFlap_png);
//    animation.addSpriteFrameWithFile(res.midFlap_png);
//    animation.setDelayPerUnit(0.1);
//    animation.setRestoreOriginalFrame(true);
//    var action = cc.animate(animation);
//    this.runAction(cc.repeatForever(action));

    var birdBox = this.getBoundingBoxToWorld();
    var birdBoxW = birdBox.width;
    var birdBoxH = birdBox.height;
    //var birdRect = cc.DrawNode.create();
    ////this.birdRect = cc.DrawNode.create();
    //birdRect.drawRect(
    //  cc.p(0, 0),
    //  cc.p(birdBoxW, birdBoxH),
    //  cc.color(0, 0, 0, 1)
    //);
    //this.addChild(birdRect);

    cc.eventManager.addListener({
      event: cc.EventListener.MOUSE,
      onMouseDown: function (event) {
        if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
          event.getCurrentTarget().up();
        }
      }
    }, this);

    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: function (key, event) {
        if (key == 32)
          event.getCurrentTarget().up();
      }
    }, this);

//    this.scheduleUpdate();
  },
  update: function (dt) {
    this.y += speedY * dt;
    if (this.y - this.height / 2 < 0) { //when the bird hit ground
      return this.hit();
      //speedY += birdJumpForce;
    }
//    if (this.y + this.height / 2 > size.height) { //when the bird fly in to space :v
//    return this.hit();
//    //speedY += gravity;
//    }
    speedY += gravity * dt;

//    if (speedY < 0) {
//      this.setTexture(res.midFlap_png);
//      let downAction = cc.rotateTo(1, 90);
//      this.runAction(cc.sequence(downAction));
//    }

//    if(this.getRotation() >= 90)
//      this.setRotation(90);
//
//    if(this.getRotation() <= -22.5)
//      this.setRotation(-22.5);
//
//    this.setRotation(this.rotation);

    if (speedY < maxSpeedY) speedY = maxSpeedY;
    //if (speedY > 0) {
    //  //this.setTexture(res.flap_png);
    //  let upAction = cc.rotateTo(0.2, -60);
    //  this.runAction(cc.sequence(upAction));
    //}
    //else {
    //  //this.setTexture(res.fall_png);
    //  let downAction = cc.rotateTo(0.2, 60);
    //  this.runAction(cc.sequence(downAction));
    //}
//    if (speedY < 0) {
//      this.setTexture(res.fall_png);
//      let downAction = cc.rotateTo(0.2, 45);
//      this.runAction(cc.sequence(downAction));
//    }
    if (speedY < 0)  {
      this.stopAllActions();
      this.setTexture(res.fall_png);
      let rotation = Math.max(-90, speedY/10);
      this.setRotation(-rotation);
    }
  },
  up: function () {
    speedY += birdJumpForce;
//    this.setTexture(res.flap_png);

    var animation = new cc.Animation();
    animation.addSpriteFrameWithFile(res.flap_png);
    animation.addSpriteFrameWithFile(res.fall_png);
    animation.setDelayPerUnit(0.1);
    animation.setRestoreOriginalFrame(true);
    var action = cc.animate(animation);
    this.runAction(cc.repeatForever(action));

    let rotation = Math.max(-90, speedY/10);
    let upAction = cc.rotateTo(0.1, -rotation);
    this.runAction(upAction);
  },
  hit: function () {
//    this.unscheduleUpdate();
    this.setTexture(res.death_png);
//    cc.audioEngine.playEffect(res.sound_die);
    this.parent.gameOver();
    return true;
  },
  getBoundingCircle: function () {
    let circle = {
      x: this.x,
      y: this.y,
      r: (this.width + this.height) / 4
    };
    return circle;
  }
});
