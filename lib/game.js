(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Game = BubbleShooter.Game = function (options) {
    this.stillBubbles = [];
    this.movingBubbles = [];
    this.cannons = [];
    this.addStillBubbles();
    this.score = 0;
    this.$scoreEl = options.$scoreEl;
    this.offset = false;
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 800;
  Game.COLOR = "#000";

  Game.BUBBLE_START_Y = 25;
  Game.BUBBLE_ROW_START_POS = 25;
  Game.BUBBLE_OFFSET_ROW_START_POS = 45;

  Game.prototype.addBubbleRow = function() {
    var start_pos = this.offset ?
      Game.BUBBLE_OFFSET_ROW_START_POS : Game.BUBBLE_ROW_START_POS;
    var options = {};
    for (var pos = start_pos; pos < 470; pos+=40) {
      options.pos = [pos,Game.BUBBLE_START_Y];
      options.vel = [0,0];
      options.game = this;
      this.stillBubbles.push(new BubbleShooter.Bubble(options));
    }

    this.offset = !this.offset;

    debugger
  }

  Game.prototype.addStillBubbles = function() {
    for (var i = 0; i < 4; i++) {
      this.shiftDown();
      this.addBubbleRow();
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

  Game.prototype.allBubbles = function() {
    return [].concat(this.stillBubbles, this.movingBubbles);
  }

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

  Game.prototype.sameColorImmediateNeighbors = function(bubble) {
    var neighbors = [];
    var bubbles = this.allBubbles();

    for (var i = 0; i < bubbles.length; i++) {
      if (bubbles[i] === bubble) {
        continue
      } else if (bubble.isCollidedWith(bubbles[i]) &&
        bubble.color === bubbles[i].color ) {
        neighbors.push(bubbles[i])
      }
    }

    return neighbors;
  };

  Game.prototype.movingBubbleToStill = function(bubble) {
    this.movingBubbles.splice(this.movingBubbles.indexOf(bubble), 1);
    this.stillBubbles.push(bubble);
  };

  Game.prototype.sameColorNeighbors = function(bubble, neighbors, toSearch) {
    var nextBubble

    neighbors.push(bubble);
    var sameColorImmediateNeighbors =
      this.sameColorImmediateNeighbors(bubble);
    sameColorImmediateNeighbors.forEach(function(neighbor){
      if (neighbors.indexOf(neighbor) === -1 &&
        toSearch.indexOf(neighbor) === -1) {
          toSearch.push(neighbor);
        }
    });

    if ( toSearch.length === 0) {
      return neighbors;
    } else {
      var nextBubble = toSearch.shift();
      return this.sameColorNeighbors(nextBubble, neighbors, toSearch);
    }
  }

  Game.prototype.step = function () {
    this.movingBubbles.forEach(function(bubble){
      bubble.step();
    });
  };

  Game.prototype.remove = function(object) {
    if (object instanceof BubbleShooter.Cannon){
      this.cannon.splice(this.cannon.indexOf(object), 1);
    } else {
      this.stillBubbles.splice(this.stillBubbles.indexOf(object), 1);
      this.score += 10;
      this.$scoreEl.html(this.score);
    }
  };

  Game.prototype.shouldShift = function() {
    return this.cannons[0].checkShotCounter();
  };

  Game.prototype.shiftDown = function() {
    this.stillBubbles.forEach(function(bubble) {
      bubble.shift([0,35]);
    });
    debugger
  };

  Game.prototype.isGameOver = function() {
    for (var i = 0; i < this.stillBubbles.length; i++) {
      if (this.stillBubbles[i].isTooLow()) {
        return true;
      }
    }

    return false;
  };

  Game.prototype.checkGameOver = function() {
    if (this.isGameOver()){
      window.alert("Game Over");
    }
  }

})();
