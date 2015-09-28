(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Bubble = BubbleShooter.Bubble = function (options) {
    this.vel = options.vel
    this.pos = options.pos;
    this.radius = 10;
    this.color = options.color;
    this.game = options.game;
  };

  Bubble.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
  };

  Bubble.prototype.neighbors = function() {
    ; //returns array of neighboring bubbles
  };

  Bubble.prototype.sameColorNeighbors = function() {

  }
})();
