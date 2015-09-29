(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }



  var Game = BubbleShooter.Game = function () {
    this.stillBubbles = [];
    this.movingBubbles = [];
    this.cannons = [];
    this.addStillBubbles();
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 800;
  Game.COLOR = "#000";

  Game.BUBBLE_START_POS = [[25,25],[65,25],[105,25],[145,25],[185,25],[225,25],
  [265,25]];

  Game.prototype.addStillBubbles = function() {
    var options = {};
    for (var i = 0; i < Game.BUBBLE_START_POS.length; i++) {
      options.pos = Game.BUBBLE_START_POS[i];
      options.vel = [0,0];
      options.game = this;
      this.stillBubbles.push(new BubbleShooter.Bubble(options))
    }
  };

  Game.prototype.addMovingBubble = function(bubble) {
    this.movingBubbles.push(bubble);
  };

  Game.prototype.addCannon = function() {
    cannon = new BubbleShooter.Cannon({ game: this });
    this.cannons.push(cannon);
    return cannon;
  };

  Game.prototype.allObjects = function() {
    return [].concat(this.stillBubbles, this.movingBubbles,this.cannons);
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object){
      object.draw(ctx);
    });
  },

  Game.prototype.isCollided = function(movingBubble) {
    for (var i = 0; i < this.stillBubbles.length; i++) {
      if ( movingBubble.isCollidedWith(this.stillBubbles[i])) {
        return true;
      }
    }

    return false;
  };


  Game.prototype.step = function () {
    this.movingBubbles.forEach(function(bubble){
      bubble.step();
    });
  };


})();
