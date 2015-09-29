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

  Bubble.prototype.isCollidedWith = function (otherBubble) {
    return BubbleShooter.Util.Distance(this.pos, otherBubble.pos) <= (
      this.radius + otherBubble.radius
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
   if (this.isAtBoardEdge()) {
     this.vel = [0,0];
     this.game.movingBubbleToStill(this);
   } else if (this.game.isCollided(this)) {
     this.vel = [0,0];
     this.game.movingBubbleToStill(this);
     this.handleCollision();
   }
  };

  Bubble.prototype.handleCollision = function() {
   var sameColorNeighbors = this.game.sameColorNeighbors(this, [], []);
   if (sameColorNeighbors.length >= 3) {
     sameColorNeighbors.forEach(function(neighbor){
       neighbor.remove();
     });
   }
  };

})();
