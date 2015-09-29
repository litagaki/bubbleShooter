(function() {
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Cannon = BubbleShooter.Cannon = function(options){
    this.angle = 0 ;
    this.color = Cannon.COLOR;
    this.radius = Cannon.RADIUS;
    this.pos = Cannon.START_POS;
    this.game = options.game;
    this.loadedBubble = new BubbleShooter.Bubble({pos: Cannon.LOADED_START_POS});
    this.queuedBubble = new BubbleShooter.Bubble({pos: Cannon.QUEUED_POS});
    this.game.addBubble(this.loadedBubble);
    this.game.addBubble(this.queuedBubble);
  };

  Cannon.QUEUED_POS = [100,750];
  Cannon.LOADED_START_POS = [250, 677]
  Cannon.START_POS = [250, 750]
  Cannon.START_LEFT_ANGLE = ( 3 * Math.PI / 2) - Math.atan(21 / 72);
  Cannon.START_RIGHT_ANGLE = ( 3 * Math.PI / 2) + Math.atan(21 / 72);
  Cannon.RADIUS = 75;
  Cannon.COLOR = '#939393';
  Cannon.MAX_ANGLE = Math.PI / 2;
  Cannon.MIN_ANGLE = -Math.PI / 2;
  Cannon.WIDTH = 21;

  Cannon.prototype.swivel = function(direction) {
    if (direction === "+" && this.angle < Cannon.MAX_ANGLE) {
      this.angle += 0.1
    } else if (direction === "-" && this.angle > Cannon.MIN_ANGLE) {
      this.angle -= 0.1
    }

    this.loadedBubble.move([
      250 + 72 * Math.sin(this.angle),
      750 - 72 * Math.cos(this.angle)
    ])
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
    ctx.arc(Cannon.START_POS[0], Cannon.START_POS[1] + 50, 80,
      Math.PI, 2 * Math.PI,false )
    ctx.closePath()
    ctx.fill();

  };

  Cannon.prototype.fire = function() {

  };


})();
