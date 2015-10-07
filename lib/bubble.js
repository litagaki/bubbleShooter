(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Bubble = BubbleShooter.Bubble = function(options) {
    options.color = Object.keys(Bubble.COLORS)[Math.floor(4 * Math.random())];
    options.radius = Bubble.RADIUS;
    BubbleShooter.Object.call(this,options)

    this.sprites = new Image();
    this.sprites.src = './images/BubbleSpritesheet.png';
  };

  Bubble.COLORS = {"yellow": 1, "red": 207, "purple": 311, "green":516 };
  Bubble.RADIUS = 17.5;
  Bubble.TOP_EDGE_Y = 5;
  Bubble.BOTTOM_EDGE_Y = 700;
  Bubble.LEFT_EDGE_X = 5;
  Bubble.RIGHT_EDGE_X = 460;


  Bubble.prototype.draw = function(ctx) {
    ctx.drawImage(
      this.sprites,
      4,
      Bubble.COLORS[this.color],
      Bubble.RADIUS * 2,
      Bubble.RADIUS * 2,
      this.pos[0],
      this.pos[1],
      Bubble.RADIUS * 2,
      Bubble.RADIUS * 2)
  }

  Bubble.prototype.startMoving  = function (vel) {
    this.vel = vel;
  };

  Bubble.prototype.move = function(newPos) {
    this.pos = newPos;
  };

  Bubble.prototype.shift = function(deltas) {
    this.pos = BubbleShooter.Util.VectorAdd(this.pos, deltas);
  };

  Bubble.prototype.isCollidedWith = function (otherBubble) {
    return BubbleShooter.Util.Distance(this.pos, otherBubble.pos) <= (
      this.radius + otherBubble.radius + 1
    )
  };

  Bubble.prototype.isAtBoardSide = function() {
    return (this.pos[0] <= Bubble.LEFT_EDGE_X || this.pos[0] > Bubble.RIGHT_EDGE_X);
  };

  Bubble.prototype.isAtBoardTop = function() {
    return (this.pos[1] <= Bubble.TOP_EDGE_Y);
  };

  Bubble.prototype.isAtBoardBottom = function() {
    return (this.pos[1] > Bubble.BOTTOM_EDGE_Y);
  };

  Bubble.prototype.step = function () {
   this.pos = BubbleShooter.Util.VectorAdd(this.pos, this.vel);
   var callback = function(){
     this.game.checkGameOver();
   }.bind(this);

   if (this.isAtBoardTop()) {
     this.handleBubbleStop(callback);
   } else if (this.isAtBoardBottom()) {
     this.remove();
   } else if (this.isAtBoardSide()) {
     this.bounce();
   } else if (this.game.isCollided(this)) {
     this.handleBubbleStop();
     this.handleCollision(callback);
   }
  };

  Bubble.prototype.bounce = function() {
    this.vel = [-this.vel[0], this.vel[1]];
  };

  Bubble.prototype.handleBubbleStop = function(callback) {
    this.vel = [0,0];
    this.game.movingBubbleToStill(this);
    //Schedule bubble shift so that it won't happen until any possible collision
    //logic has been handled
    if (this.game.shouldShift()) {
      window.setTimeout(function(){
        this.game.shiftDown();
        this.game.addBubbleRow();
        callback && callback();
      }.bind(this),0);
    } else {
      callback && callback();
    }
  };

  Bubble.prototype.handleCollision = function(callback) {
   var sameColorNeighbors = this.game.Neighbors(this, [], [], true);
   if (sameColorNeighbors.length >= 3) {
     sameColorNeighbors.forEach(function(neighbor){
       neighbor.remove();
     });
   }
   this.game.handleOrphanBubbles();
   callback && callback();
  };

  Bubble.prototype.isTooLow = function() {
    return this.pos[1] >= 600
  };

})();
