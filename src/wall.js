var Wall = cc.Layer.extend({
  //delaySpawn: 0,
  lastColumns: {
    up: null,
    down: null
  },
  firstColumns: {
    up: null,
    down: null
  },
  checkColumns: {
    up: null,
    down: null
  },
  gamePlay: null,
  bird: null,
  ctor: function (gamePlay) {
    this._super();
    this.gamePlay = gamePlay;
    this.bird = this.gamePlay.bird;
    var posY = this.randomHeight();
    this.firstColumns.up
      = this.checkColumns.up
      = this.lastColumns.up
      = new Column(true, size.width, posY);
    this.firstColumns.down
      = this.checkColumns.down
      = this.lastColumns.down
      = new Column(false, size.width, posY);
    this.addChild(this.lastColumns.up);
    this.addChild(this.lastColumns.down);
    while (this.lastColumns.up.x < 2 * size.width) {
      //this.spawnColumn(this.lastColumns.up.x + this.lastColumns.up.width + spaceWidth);
      var posX = this.lastColumns.up.x + this.lastColumns.up.width + spaceWidth;
      var posY = this.randomHeight();
      this.lastColumns.up.next = new Column(true, posX, posY);
      this.lastColumns.up = this.lastColumns.up.next;
      this.lastColumns.down.next = new Column(false, posX, posY);
      this.lastColumns.down = this.lastColumns.down.next;
      this.addChild(this.lastColumns.up);
      this.addChild(this.lastColumns.down);
    }
    this.lastColumns.up.next = this.firstColumns.up;
    this.lastColumns.down.next = this.firstColumns.down;
    this.scheduleUpdate();
  },

  update: function (dt) {
    //this.delaySpawn -= dt;
    //if (this.delaySpawn <= 0) {
    //  this.delaySpawn = spawnTime;
    //  var posY = Math.floor(cc.rand() % (size.height - spaceWidth - 20)) + 10;
    //  this.lastColumns.down = new Column(false, posY);
    //  this.lastColumns.up = new Column(true, posY);
    //  this.addChild(this.lastColumns.up);
    //  this.addChild(this.lastColumns.down);
    //  this.lastColumns.down.bird = this.gamePlay.bird;
    //  this.lastColumns.up.bird = this.gamePlay.bird;
    //  //this.lastColumns.down.ground =  this.gamePlay.ground;
    //  //  this.lastColumns.up.ground = this.gamePlay.ground;
    //}
    if (this.parent.checkCollision(this.bird, this.checkColumns)) {
      this.bird.hit();
      this.unscheduleUpdate();
      this.parent.unscheduleUpdate();
      this.unscheduleAllCallbacks();
    }

    if (this.checkColumns.up.x < this.bird.x) {
//      cc.audioEngine.playEffect(res.sound_point, 0);
      ++score;
      if (speedX > maxSpeedX) {
        speedX -= 10;
      }
      //if (score % 3 == 0 && spaceWidth > minSpaceWidth) {
      //  spaceWidth--;
      //}
      //if (score % 5 == 0 && spaceHeight > minSpaceHeight) {
      //  spaceHeight--;
      //}
      if (score > highScore)
        highScore = score;
      //cc.log("Check1: ", this.checkColumns.up.x);
      this.checkColumns.up = this.checkColumns.up.next;
      this.checkColumns.down = this.checkColumns.down.next;
      //cc.log("Check2: ", this.checkColumns.up.x);
      //++speedX;
    }

    if (this.firstColumns.up.x + this.firstColumns.up.width / 2 < 0) {
      var posX = this.lastColumns.up.x + this.lastColumns.up.width + spaceWidth;
      var posY = this.randomHeight();
      var h = this.lastColumns.up.height;
      //cc.log("First1: ", this.firstColumns.up.x, ", last1: ", this.lastColumns.up.x);
      this.firstColumns.up.setPosition(posX, posY + h / 2 + spaceHeight);
      this.firstColumns.down.setPosition(posX, posY - h / 2);
      this.firstColumns.up = this.firstColumns.up.next;
      this.firstColumns.down = this.firstColumns.down.next;
      this.lastColumns.up = this.lastColumns.up.next;
      this.lastColumns.down = this.lastColumns.down.next;
      //cc.log("First2: ", this.firstColumns.up.x, ", last2: ", this.lastColumns.up.x);
      //cc.log(" ", this.firstColumns.up.x, this.checkColumns.up.x, this.lastColumns.up.x);
    }

  },

  spawnColumn: function (posX) {
    var posY = this.randomHeight();
    this.lastColumns.up.next = new Column(true, posX, posY);
    this.lastColumns.up = this.lastColumns.up.next;
    this.lastColumns.down.next = new Column(false, posX, posY);
    this.lastColumns.down = this.lastColumns.down.next;
    this.addChild(this.lastColumns.up);
    this.addChild(this.lastColumns.down);
  },

  randomHeight: function () {
    return Math.floor(cc.rand() % (size.height - spaceHeight - 20)) + 10;
  }
});

var Column = cc.Sprite.extend({
  nextColumn: null,
  //bird: null,
  //score: true,
  ctor: function (isUpColumn, posX, posY) {
    this.isUpColumn = isUpColumn;
    if (isUpColumn) {
      this._super(res.upColumn_png);
      this.setPosition(posX, posY + this.height / 2 + spaceHeight);
    } else {
      this._super(res.downColumn_png);
      this.setPosition(posX, posY - this.height / 2);
    }

    //this.drawBox(); //draw bounding box for test
    this.scheduleUpdate();
  },

  update: function (dt) {
    //if (this.parent.parent.checkCollision(this.bird, this, this.isUpColumn)) {
    //  cc.log("Bird hit column!");
    //  this.bird.hit();
    //  this.unscheduleUpdate();
    //  this.parent.unscheduleUpdate();
    //  this.unscheduleAllCallbacks();
    //}
    //
    //if (this.x < this.bird.x && this.score && this.isUpColumn) {
    //  ++score;
    //  this.score = false;
    //}
    //
    //if (this.x + this.width / 2 < 0) {
    //  //this.removeFromParent(cc.cleanup());
    //  this.parent.removeChild(this);
    //  return;
    //}

    this.x += speedX * dt;
  },
  drawBox: function () {
    var colBox = this.getBoundingBoxToWorld();
    var w = colBox.width;
    var h = colBox.height;
    var colRect = cc.DrawNode.create();
    colRect.drawRect(
      cc.p(0, 0),
      cc.p(w, h),
      cc.color(0, 0, 0, 1)
    );
    this.addChild(colRect);
  }
});
