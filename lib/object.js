(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Bubble = BubbleShooter.Object = function (options) {
    this.vel = options.vel
    this.pos = options.pos;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  Object.prototype.remove = function() {
    this.game.remove(this);
  };
})();
