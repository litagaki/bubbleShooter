(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Bubble = BubbleShooter.Bubble = function(options) {
    options.color = Bubble.COLORS[Math.floor(4 * Math.random())];
    options.radius = Bubble.RADIUS;
    BubbleShooter.Object.call(this,options)
  };

  Bubble.COLORS = ["#7CC5D7", "#12C20A", "#CC0000", "#590059"];
  Bubble.RADIUS = 20;

  Bubble.prototype.startMoving  = function (vel) {
    this.vel = vel;
  };

  Bubble.prototype.move = function(newPos) {
    this.pos = newPos;
  };

  Bubble.prototype.shift = function(deltas) {
    this.pos = BubbleShooter.Util.VectorAdd(this.pos, deltas);
  };

  Bubble.prototype.isCollidedWith = function (otherBubble) {
    return BubbleShooter.Util.Distance(this.pos, otherBubble.pos) <= (
      this.radius + otherBubble.radius + 1
    )
  };

  Bubble.prototype.isAtBoardEdge = function() {
    if (this.pos[0] < 25 ||
      this.pos[1] < 25 ||
      this.pos[0] > (475)
    ) {
      return true;
    }

    return false;
  };

  Bubble.prototype.step = function () {
   this.pos = BubbleShooter.Util.VectorAdd(this.pos, this.vel);
   var callback = function(){
     this.game.checkGameOver();
   }.bind(this);

   if (this.isAtBoardEdge()) {
     this.handleBubbleStop(callback);
   } else if (this.game.isCollided(this)) {
     this.handleBubbleStop();
     this.handleCollision(callback);
   }
  };

  Bubble.prototype.handleBubbleStop = function(callback) {
    this.vel = [0,0];
    this.game.movingBubbleToStill(this);
    if (this.game.shouldShift()) {
      window.setTimeout(function(){
        this.game.shiftDown();
        this.game.addBubbleRow();
        callback && callback();
      }.bind(this),0);
    } else {
      callback && callback();
    }
  };

  Bubble.prototype.handleCollision = function(callback) {
   var sameColorNeighbors = this.game.sameColorNeighbors(this, [], []);
   if (sameColorNeighbors.length >= 3) {
     sameColorNeighbors.forEach(function(neighbor){
       neighbor.remove();
     });
   }
   callback && callback();
  };

  Bubble.prototype.isTooLow = function() {
    if (this.pos[1] >= 650) {
      return true;
    }

    return false;
  }

})();
