(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }



  var Game = BubbleShooter.Game = function () {
    this.bubbles = [];
    this.cannons = [];
    this.addBubbles();
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 800;
  Game.COLOR = "#000";

  Game.BUBBLE_START_POS = [[25,25],[65,25],[105,25],[145,25],[185,25],[225,25],
  [265,25]];

  Game.prototype.addBubbles = function() {
    var bubble;
    var options = {};
    for (var i = 0; i < Game.BUBBLE_START_POS.length; i++) {
      options.pos = Game.BUBBLE_START_POS[i];
      options.vel = 0;
      options.game = this;
      bubble = new BubbleShooter.Bubble(options)
      this.addBubble(bubble);
    }
  };

  Game.prototype.addBubble = function(bubble) {
    this.bubbles.push(bubble);
  };

  Game.prototype.addCannon = function() {
    cannon = new BubbleShooter.Cannon({ game: this });
    this.cannons.push(cannon);
    return cannon;
  };

  Game.prototype.allObjects = function() {
    return [].concat(this.bubbles,this.cannons);
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object){
      object.draw(ctx);
    });
  }


})();
