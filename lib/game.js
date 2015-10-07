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

  Game.BUBBLE_START_Y = 5;
  Game.BUBBLE_ROW_START_POS = 5;
  Game.BUBBLE_OFFSET_ROW_START_POS = 22.5;

  Game.prototype.addBubbleRow = function() {
    var start_pos = this.offset ?
      Game.BUBBLE_OFFSET_ROW_START_POS : Game.BUBBLE_ROW_START_POS;
    var options = {};
    for (var pos = start_pos; pos < 460; pos+=35) {
      options.pos = [pos,Game.BUBBLE_START_Y];
      options.vel = [0,0];
      options.game = this;
      this.stillBubbles.push(new BubbleShooter.Bubble(options));
    }

    this.offset = !this.offset;
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

  Game.prototype.ImmediateNeighbors = function(bubble,byColor) {
    var neighbors = [];
    var bubbles = this.allBubbles();

    for (var i = 0; i < bubbles.length; i++) {
      if (bubbles[i] === bubble) {
        continue
      } else if (bubble.isCollidedWith(bubbles[i])) {
        if (byColor && bubble.color !== bubbles[i].color ) {
          continue
        }
        neighbors.push(bubbles[i])
      }
    }

    return neighbors;
  };

  Game.prototype.movingBubbleToStill = function(bubble) {
    this.movingBubbles.splice(this.movingBubbles.indexOf(bubble), 1);
    this.stillBubbles.push(bubble);
  };

  Game.prototype.stillBubbleToMoving = function(bubble) {
    this.stillBubbles.splice(this.stillBubbles.indexOf(bubble), 1);
    this.movingBubbles.push(bubble);
  };
  Game.prototype.Neighbors = function(bubble, neighbors, toSearch, byColor) {
    var nextBubble

    neighbors.push(bubble);
    var sameColorImmediateNeighbors =
      this.ImmediateNeighbors(bubble, byColor);
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
      return this.Neighbors(nextBubble, neighbors, toSearch, byColor);
    }
  };

  Game.prototype.handleOrphanBubbles = function() {
    this.stillBubbles.forEach(function(bubble) {
      var neighbors = this.Neighbors(bubble, [], []);
      var orphan = true;

      for (var i = 0; i < neighbors.length; i++) {
        if (neighbors[i].isFirstRow()) {
          orphan = false;
        }
      }

      if (orphan) {
        neighbors.forEach(function(neighbor) {
          this.stillBubbleToMoving(neighbor);
          neighbor.startMoving([0,2]);
        }.bind(this));
      }

    }.bind(this));
  };

  Game.prototype.step = function () {
    this.movingBubbles.forEach(function(bubble){
      bubble.step();
    });
  };

  Game.prototype.remove = function(object) {
    if (object instanceof BubbleShooter.Cannon){
      this.cannon.splice(this.cannon.indexOf(object), 1);
    } else {
      if (this.stillBubbles.indexOf(object) !== -1) {
        this.stillBubbles.splice(this.stillBubbles.indexOf(object), 1);
      } else {
        this.movingBubbles.splice(this.movingBubbles.indexOf(object),1);
      }

      this.score += 10;
      this.$scoreEl.html(this.score);
    }
  };

  Game.prototype.shouldShift = function() {
    return this.cannons[0].checkShotCounter();
  };

  Game.prototype.shiftDown = function() {
    this.stillBubbles.forEach(function(bubble) {
      bubble.shift([0,31]);
    });
  };

  Game.prototype.isGameOver = function() {
    for (var i = 0; i < this.stillBubbles.length; i++) {
      if (this.stillBubbles[i].isTooLow()) {
        return true;
      }
    }

    return false;
  };



})();
