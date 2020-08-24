var ScoreInfo = cc.Layer.extend({
  scoreLabel: null,
  highScoreLabel: null,
  ctor: function () {
    this._super();
    this.scoreLabel = new ccui.Text();
    this.scoreLabel.setString("Your Score: " + score);
    this.scoreLabel.setPosition(size.width * 0.9, size.height * 0.9);
    this.scoreLabel.setFontSize(20);
    this.addChild(this.scoreLabel);
    this.highScoreLabel = new ccui.Text();
    this.highScoreLabel.setString("High Score: " + highScore);
    this.highScoreLabel.setPosition(size.width * 0.9, size.height * 0.8);
    this.highScoreLabel.setFontSize(20);
    this.addChild(this.highScoreLabel);
    this.scheduleUpdate();
  },
  update: function (dt) {
    this.scoreLabel.setString("Your Score: " + score);
    this.highScoreLabel.setString("High Score: " + highScore);
  }
});