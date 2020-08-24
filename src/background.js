var count = 0; //for test
var BackGround = cc.Layer.extend({
  ground: null,
  sky: null,
  ctor: function () {
    this._super();
    this.addNewGround(0, 0);
    this.addNewSky(0, size.height/2);
    while (this.ground.x < size.width) {
      this.addNewGround(this.ground.x + this.ground.width, 0);
    }
    while (this.sky.x < size.width) {
      this.addNewSky(this.sky.x + this.sky.width, size.height/2);
    }
  },
  addNewGround: function(x, y) {
    this.ground = new Ground(x, y);
    this.addChild(this.ground, 1);
  },
  addNewSky: function(x, y) {
    this.sky = new Sky(x, y);
    this.addChild(this.sky, 0);
  }
});

var Ground = cc.Sprite.extend({
  ctor: function (x, y) {
    this._super(res.grass_png);
    this.setPosition(x, y);
    this.scheduleUpdate();
  }
  ,
  update: function (dt) {
    //if (this.x <= size.width && !this.hasNext) {
    //  let newGround = new Ground(this.x + this.width, 0);
    //  this.parent.addChild(newGround, 0);
    //  this.hasNext = true;
    //}
    if (this.x + this.width / 2 <= 0) {
      //this.unscheduleUpdate();
      //this.parent.removeChild(this);
      this.setPosition(this.parent.ground.x + this.width, 0);
      this.parent.ground = this;
    }
    this.x += speedX * dt;
  }
});

var Sky = cc.Sprite.extend({
  ctor: function (x, y) {
    this._super(res.sky_png);
    this.setPosition(x, y);
    this.scheduleUpdate();
  },
  update: function (dt) {
    //if (this.x <= size.width && !this.hasNext) {
    //  let newSky = new Sky(this.x + this.width, size.height / 2);
    //  this.parent.addChild(newSky, 0);
    //  this.hasNext = true;
    //}
    if (this.x + this.width / 2 <= 0) {
      //this.unscheduleUpdate();
      //this.parent.removeChild(this);
      this.setPosition(this.parent.sky.x + this.width, size.height/2);
      this.parent.sky = this;
    }
    this.x += speedX * dt;
  }
});