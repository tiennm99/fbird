var GamePlay = cc.Layer.extend({
    bird: null,
    wall: null,

    //birdRect: null, //for testing
    //birdCircle: null, //for testing

    ctor: function () {
      this._super();
      this.bird = new Bird();
      this.wall = new Wall(this);

      this.addChild(this.bird, 2);
      this.addChild(this.wall, 1);

      //this.birdRect = cc.DrawNode.create();
      //this.addChild(this.birdRect, 1);

      //this.birdCircle = cc.DrawNode.create();
      //this.addChild(this.birdCircle, 1);
      cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
        onMouseDown: function (event) {
          if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
            event.getCurrentTarget().bird.scheduleUpdate();
//            event.getCurrentTarget().wall.scheduleUpdate();
            cc.eventManager.removeListener(event);
          }
        }
      }, this);
      cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function (key, event) {
          if (key == 32) {
            event.getCurrentTarget().bird.scheduleUpdate();
            cc.eventManager.removeListener(event);
          }
        }
      }, this);
    },

    checkCollision: function (bird, columns) {
      var birdBox = bird.getBoundingBoxToWorld();
      //var columnBox = column.getBoundingBoxToWorld();
      //if (cc.rectContainsPoint(columnBox, cc.p(birdBox.x, birdBox.y))
      //  || cc.rectContainsPoint(columnBox, cc.p(birdBox.x + birdBox.width, birdBox.y))
      //  || cc.rectContainsPoint(columnBox, cc.p(birdBox.x, birdBox.y + birdBox.height))
      //  || cc.rectContainsPoint(columnBox, cc.p(birdBox.x + birdBox.width, birdBox.y + birdBox.height))
      //) {
      //  cc.log("Collision with boundingBox");
      //  //return true;
      //}
      //
      //this.birdRect.clear();
      //this.birdRect.drawRect(
      //  cc.p(birdBox.x, birdBox.y),
      //  cc.p(birdBox.x + birdBox.width, birdBox.y + birdBox.height),
      //  cc.color(0, 0, 0, 1)
      //);
      var upColumnBox = columns.up.getBoundingBoxToWorld();
      var downColumnBox = columns.down.getBoundingBoxToWorld();
      var birdBoundingCircle = bird.getBoundingCircle();
      //this.birdCircle.clear();
      //this.birdCircle.drawCircle(
      //  cc.p(birdBoundingCircle.x, birdBoundingCircle.y),
      //  birdBoundingCircle.r,
      //  0, 64, false, 2,
      //  cc.color(255, 255, 255, 255)
      //);

      var collisionWithCircle = false;

//      if (birdBoundingCircle.x < upColumnBox.x) {
//        if (birdBoundingCircle.y < upColumnBox.y) {
//          if (cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y),
//              cc.p(upColumnBox.x, upColumnBox.y)) < birdBoundingCircle.r)
//          //return true;
//            collisionWithCircle = true;
//        } else {
//          if (birdBoundingCircle.x + birdBoundingCircle.r > upColumnBox.x)
//          //return true;
//            collisionWithCircle = true;
//        }
//      } else if (birdBoundingCircle.x > upColumnBox.x + upColumnBox.width) {
//        if (birdBoundingCircle.y < upColumnBox.y) {
//          if (cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y),
//              cc.p(upColumnBox.x + upColumnBox.width, upColumnBox.y)) < birdBoundingCircle.r)
//          //return true;
//            collisionWithCircle = true;
//        } else {
//          if (birdBoundingCircle.x - birdBoundingCircle.r < upColumnBox.x)
//          //return true;
//            collisionWithCircle = true;
//        }
//      } else {
//        if (birdBoundingCircle.y < upColumnBox.y) {
//          if (birdBoundingCircle.y + birdBoundingCircle.r > upColumnBox.y)
//          //return true;
//            collisionWithCircle = true;
//        } else {
//          //return true;
//          collisionWithCircle = true;
//        }
//      }
//
//      if (birdBoundingCircle.x < downColumnBox.x) {
//        if (birdBoundingCircle.y > downColumnBox.y + downColumnBox.height) {
//          if (cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y),
//              cc.p(downColumnBox.x, downColumnBox.y + downColumnBox.height)) < birdBoundingCircle.r)
//          //return true;
//            collisionWithCircle = true;
//        } else {
//          if (birdBoundingCircle.x + birdBoundingCircle.r > downColumnBox.x)
//          //return true;
//            collisionWithCircle = true;
//        }
//      } else if (birdBoundingCircle.x > downColumnBox.x + downColumnBox.width) {
//        if (birdBoundingCircle.y > downColumnBox.y + downColumnBox.height) {
//          if (cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y),
//              cc.p(downColumnBox.x + downColumnBox.width, downColumnBox.y + downColumnBox.height)) < birdBoundingCircle.r)
//          //return true;
//            collisionWithCircle = true;
//        } else {
//          if (birdBoundingCircle.x - birdBoundingCircle.r < downColumnBox.x)
//          //return true;
//            collisionWithCircle = true;
//        }
//      } else {
//        if (birdBoundingCircle.y > downColumnBox.y + downColumnBox.height) {
//          if (birdBoundingCircle.y - birdBoundingCircle.r < downColumnBox.y + downColumnBox.height)
//          //return true;
//            collisionWithCircle = true;
//        } else {
//          //return true;
//          collisionWithCircle = true;
//        }
//      }

      if (birdBoundingCircle.x < upColumnBox.x) {
        if (birdBoundingCircle.y < upColumnBox.y
          && birdBoundingCircle.y > downColumnBox.y + downColumnBox.height) {
          if (cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y),
              cc.p(upColumnBox.x, upColumnBox.y)) < birdBoundingCircle.r
            || cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y),
              cc.p(downColumnBox.x, downColumnBox.y + downColumnBox.height)) < birdBoundingCircle.r
          )
          //return true;
            collisionWithCircle = true;
        } else {
          if (birdBoundingCircle.x + birdBoundingCircle.r > upColumnBox.x)
          //return true;
            collisionWithCircle = true;
        }
      } else if (birdBoundingCircle.x > upColumnBox.x + upColumnBox.width) {
        if (cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y),
            cc.p(upColumnBox.x + upColumnBox.width, upColumnBox.y)) < birdBoundingCircle.r
          || cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y),
            cc.p(downColumnBox.x + downColumnBox.width, downColumnBox.y + downColumnBox.height)) < birdBoundingCircle.r)
        //return true;
          collisionWithCircle = true;
      } else {
        if (birdBoundingCircle.y + birdBoundingCircle.r > upColumnBox.y
          || birdBoundingCircle.y - birdBoundingCircle.r < downColumnBox.y + downColumnBox.height)
        //return true;
          collisionWithCircle = true;
      }

      //if (birdBoundingCircle.x < columnBox.x) {
      //  if (birdBoundingCircle.y > columnBox.y + columnBox.height) {
      //    if (cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y), cc.p(columnBox.x, columnBox.y + columnBox.height)) < birdBoundingCircle.r)
      //    //return true;
      //      collisionWithCircle = true;
      //  } else if (birdBoundingCircle.y < columnBox.y) {
      //    if (cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y), cc.p(columnBox.x, columnBox.y)) < birdBoundingCircle.r)
      //    //return true;
      //      collisionWithCircle = true;
      //  } else {
      //    if (birdBoundingCircle.x + birdBoundingCircle.r > columnBox.x)
      //
      //    //return true;
      //      collisionWithCircle = true;
      //  }
      //} else if (birdBoundingCircle.x > columnBox.x + columnBox.width) {
      //  if (birdBoundingCircle.y > columnBox.y + columnBox.height) {
      //    if (cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y), cc.p(columnBox.x + columnBox.width, columnBox.y + columnBox.height)) < birdBoundingCircle.r)
      //    //return true;
      //      collisionWithCircle = true;
      //  } else if (birdBoundingCircle.y < columnBox.y) {
      //    if (cc.pDistance(cc.p(birdBoundingCircle.x, birdBoundingCircle.y), cc.p(columnBox.x + columnBox.width, columnBox.y)) < birdBoundingCircle.r)
      //    //return true;
      //      collisionWithCircle = true;
      //  } else {
      //    if (birdBoundingCircle.x - birdBoundingCircle.r < columnBox.x)
      //    //return true;
      //      collisionWithCircle = true;
      //  }
      //} else {
      //  if (birdBoundingCircle.y > columnBox.y + columnBox.height) {
      //    if (birdBoundingCircle.y - birdBoundingCircle.r < columnBox.y + columnBox.height)
      //    //return true;
      //      collisionWithCircle = true;
      //  } else if (birdBoundingCircle.y < columnBox.y) {
      //    if (birdBoundingCircle.y + birdBoundingCircle.r > columnBox.y)
      //    //return true;
      //      collisionWithCircle = true;
      //  } else {
      //    //return true;
      //    collisionWithCircle = true;
      //  }
      //}
      if (collisionWithCircle) {
        //cc.log("Collision with boundingCircle!");
        return true;
      }
      return false;
    },
    gameOver: function () {
      ls.setItem(hsKey, highScore);
      cc.log("Game Over!");
      //cc.director.end();
      this.bird.stopAllActions();
      this.bird.unscheduleUpdate();
      let rotateBird = cc.rotateTo(0.1, 90);
      let fallBird = cc.moveTo(0.25, this.bird.x, this.bird.height / 2);
      this.bird.runAction(rotateBird);
      this.bird.runAction(fallBird);
      for (var child of this.wall.getChildren()) {
        child.unscheduleUpdate();
      }
      this.wall.unscheduleUpdate();
      for (var child of this.parent.backGround.getChildren()) {
        child.unscheduleUpdate();
      }
      var nextScene = new cc.TransitionFade(1.5, new MenuScene(), cc.color(0, 0, 0));
      cc.director.runScene(nextScene);
    }
  }
);
