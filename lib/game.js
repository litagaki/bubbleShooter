(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }



  var Game = BubbleShooter.Game = function () {
    this.bubbles = [];
    this.cannons = [];
    this.addBubbles();
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 1200;
  Game.COLOR = #000;

  Game.BUBBLE_START_POS = [[10,10],[10,20],[10,1190]]

  Game.prototype.addBubbles = function() {
    var pos;
    var options = {};
    for (var i = 0; i < Game.BUBBLE_START_POS; i++) {
      options.pos = Game.BUBBLE_START_POS(0);
      options.vel = 0;
      options.game = this;
      this.bubbles.push(new Bubble(options));
    }
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

  }
}
