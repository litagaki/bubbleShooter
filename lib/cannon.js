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
    this.loadedBubble = new BubbleShooter.Bubble({
      pos: Cannon.LOADED_START_POS,
      vel: [0,0],
      game: this.game
    });
    this.queuedBubble = new BubbleShooter.Bubble({
      pos: Cannon.QUEUED_POS,
      vel: [0,0],
      game: this.game
    });
    this.game.addMovingBubble(this.loadedBubble);
    this.game.addMovingBubble(this.queuedBubble);
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
  Cannon.SHOOTING_VEL = 2;

  Cannon.prototype.swivel = function(direction) {
    if (direction === "+" && this.angle < Cannon.MAX_ANGLE) {
      this.angle += 0.1
    } else if (direction === "-" && this.angle > Cannon.MIN_ANGLE) {
      this.angle -= 0.1
    }

    this.adjustLoadedPos();
  };

  Cannon.prototype.draw = function() {
    ctx.fillStyle = this.color;

    //draw barrel of cannon
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

    //draw base of cannon
    ctx.beginPath()
    ctx.arc(Cannon.START_POS[0], Cannon.START_POS[1] + 50, 80,
      Math.PI, 2 * Math.PI,false )
    ctx.closePath()
    ctx.fill();

  };

  Cannon.prototype.adjustLoadedPos = function() {
    this.loadedBubble.move([
      Cannon.START_POS[0] + Cannon.RADIUS * Math.sin(this.angle),
      Cannon.START_POS[1] - Cannon.RADIUS * Math.cos(this.angle)
    ])
  };

  Cannon.prototype.fire = function () {
    var vel = [Cannon.SHOOTING_VEL * Math.sin(this.angle),
               - Cannon.SHOOTING_VEL * Math.cos(this.angle)];
    this.loadedBubble.startMoving(vel);
    this.loadedBubble = this.queuedBubble;

    this.adjustLoadedPos();
    this.queuedBubble = new BubbleShooter.Bubble({
      pos: Cannon.QUEUED_POS,
      vel: [0,0],
      game: this.game
    });
    this.game.addMovingBubble(this.queuedBubble);

  };

})();
