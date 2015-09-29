(function() {
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Cannon = BubbleShooter.Cannon = function(options){
    this.angle = 0 ;
    this.color = Cannon.COLOR;
    this.radius = 75;
    this.pos = [250,750];
    this.game = options.game;
  };

  Cannon.START_POS = [250, 750]
  Cannon.START_LEFT_ANGLE = ( 3 * Math.PI / 2) - Math.atan(21 / 72);
  Cannon.START_RIGHT_ANGLE = ( 3 * Math.PI / 2) + Math.atan(21 / 72);
  Cannon.RADIUS = 75;
  Cannon.COLOR = '#939393';
  Cannon.MAX_ANGLE = Math.PI / 2;
  Cannon.MIN_ANGLE = -Math.PI / 2;
  Cannon.WIDTH = 21;

  Cannon.prototype.rotate = function(direction) {
    if (direction === "+" && this.angle < Cannon.MAX_ANGLE) {
      this.angle += 0.1
    } else if (direction === "-" && this.angle > Cannon.MIN_ANGLE) {
      this.angle -= 0.1
    }
  };

  Cannon.prototype.draw = function() {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      Cannon.START_POS[0],
      Cannon.START_POS[1],
      this.radius,
      Cannon.START_LEFT_ANGLE + this.angle,
      Cannon.START_RIGHT_ANGLE + this.angle, false
    );
    ctx.lineTo(Cannon.START_POS[0] + Cannon.WIDTH * Math.cos(this.angle),
      Cannon.START_POS[1] + Cannon.WIDTH * Math.sin(this.angle) );
    ctx.lineTo(Cannon.START_POS[0] - Cannon.WIDTH * Math.cos(this.angle),
    Cannon.START_POS[1] - Cannon.WIDTH * Math.sin(this.angle) );
    ctx.closePath();
    ctx.fill();

    ctx.beginPath()
    ctx.arc(Cannon.START_POS[0], Cannon.START_POS[1] + 60, 80,
      Math.PI, 2 * Math.PI,false )
    ctx.closePath()
    ctx.fill();

  };

  Cannon.prototype.fire = function() {

  };


})();
