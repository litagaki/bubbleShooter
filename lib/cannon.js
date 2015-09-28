(function() {
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Cannon = BubbleShooter.Cannon = function(options){
    this.angle = 0;
    this.color = Cannon.COLOR;
    this.radius = 75;
    this.pos = [750,3800];
    this.game = options.game;
  };

  Cannon.START_LEFT_ANGLE = (Math.PI / 2) + Math.atan(21 / 72);
  Cannon.START_RIGHT_ANGLE = (Math.PI / 2) - Math.atan(21 / 72);
  Cannon.RADIUS = 75;

  Cannon.prototype.draw = function() {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, Cannon.START_LEFT_ANGLE + this.angle,
      Cannon.START_RIGHT_ANGLE + this.angle, true
    );
    ctx.lineTo([750 + 21 * Math.cos(this.angle), 3800 - Math.sin(this.angle) ]);
    ctx.lineTo([750 - 21 * Math.cos(this.angle), 3800 + Math.sin(this.angle) ]);
    ctx.closePath();
    ctx.fill();
  };

  Cannon.prototype.fire = function() {

  };


})();
