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

  Bubble.prototype.step = function () {
   this.pos = BubbleShooter.Util.VectorAdd(this.pos, this.vel);
   if (this.game.isCollided(this)) {
     this.vel = [0,0];
   }
  };

  Bubble.prototype.neighbors = function() {
    ; //returns array of neighboring bubbles
  };

  Bubble.prototype.sameColorNeighbors = function() {
    ; //filters neighbors of like color
  };



})();
