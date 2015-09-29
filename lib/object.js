(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Bubble = BubbleShooter.Object = function (options) {
    this.vel = options.vel
    this.pos = options.pos;
    this.options = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  Object.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false
    );
    ctx.fill();
  };

  Object.prototype.remove = function() {
    this.game.remove(this);
  };
})();
