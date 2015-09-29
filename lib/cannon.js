(function() {
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Cannon = BubbleShooter.Cannon = function(options){
    this.angle = Math.PI/4 ;
    this.color = Cannon.COLOR;
    this.radius = 75;
    this.pos = [250,900];
    this.game = options.game;
  };

  Cannon.START_LEFT_ANGLE = ( 3 * Math.PI / 2) - Math.atan(21 / 72);
  Cannon.START_RIGHT_ANGLE = ( 3 * Math.PI / 2) + Math.atan(21 / 72);
  Cannon.RADIUS = 75;
  Cannon.COLOR = '#939393'

  Cannon.prototype.draw = function() {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, Cannon.START_LEFT_ANGLE + this.angle,
      Cannon.START_RIGHT_ANGLE + this.angle, false
    );
    ctx.lineTo(250 + 21 * Math.cos(this.angle), 900 + 21 * Math.sin(this.angle) );
    ctx.lineTo(250 - 21 * Math.cos(this.angle), 900 - 21 * Math.sin(this.angle) );
    ctx.closePath();
    ctx.fill();
  };

  Cannon.prototype.fire = function() {

  };


})();
