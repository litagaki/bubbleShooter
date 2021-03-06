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
    this.shotCounter = 0;
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

  Cannon.QUEUED_POS = [100,700];
  Cannon.LOADED_START_POS = [233, 610]
  Cannon.START_POS = [250, 700]
  Cannon.START_LEFT_ANGLE = ( 3 * Math.PI / 2) - Math.atan(21 / 72);
  Cannon.START_RIGHT_ANGLE = ( 3 * Math.PI / 2) + Math.atan(21 / 72);
  Cannon.RADIUS = 75;
  Cannon.COLOR = '#939393';
  Cannon.MAX_ANGLE = Math.PI / 2;
  Cannon.MIN_ANGLE = -Math.PI / 2;
  Cannon.WIDTH = 21;
  Cannon.SHOOTING_VEL = 2;
  Cannon.SHOTS_BEFORE_RESET = 6;
  Cannon.SWIVEL_AMOUNT = Math.PI /60;
  Cannon.BASE_RADIUS = 80;
  Cannon.BASE_CENTER_OFFSET = 50;

  Cannon.prototype.swivel = function(direction) {
    if (direction === "+" && this.angle < Cannon.MAX_ANGLE) {
      this.angle += Cannon.SWIVEL_AMOUNT
    } else if (direction === "-" && this.angle > Cannon.MIN_ANGLE) {
      this.angle -= Cannon.SWIVEL_AMOUNT
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
    ctx.arc(Cannon.START_POS[0],
      Cannon.START_POS[1] + Cannon.BASE_CENTER_OFFSET,
      Cannon.BASE_RADIUS,
      Math.PI,
      2 * Math.PI,
      false )
    ctx.closePath()
    ctx.fill();

  };

  Cannon.prototype.adjustLoadedPos = function() {
    this.loadedBubble.move(this.loadedBubblePos());
  };

  Cannon.prototype.loadedBubblePos = function(){
    return [
      Cannon.START_POS[0] +
        Cannon.RADIUS * Math.sin(this.angle) -
        BubbleShooter.Bubble.RADIUS,
      Cannon.START_POS[1] - Cannon.RADIUS * Math.cos(this.angle) -
      BubbleShooter.Bubble.RADIUS
    ]
  };

  Cannon.prototype.checkShotCounter = function() {
    if (this.shotCounter === Cannon.SHOTS_BEFORE_RESET ) {
      this.shotCounter = 0;
      return true
    }
    return false
  };

  Cannon.prototype.canFireYet = function() {
    return (2 * this.lastShotBubble.radius <
      BubbleShooter.Util.Distance(this.loadedBubblePos(),this.lastShotBubble.pos))
  };

  Cannon.prototype.fire = function () {
    if (this.lastShotBubble && !this.canFireYet()) {
      return;
    }

    this.shotCounter += 1;

    var vel = [Cannon.SHOOTING_VEL * Math.sin(this.angle),
               - Cannon.SHOOTING_VEL * Math.cos(this.angle)];
    this.loadedBubble.startMoving(vel);
    this.lastShotBubble = this.loadedBubble;
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
