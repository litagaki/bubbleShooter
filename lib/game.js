(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Game = BubbleShooter.Game = function (options) {
    this.stillBubbles = [];
    this.movingBubbles = [];
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
  Game.BUBBLE_ROW_SPACING = 31;
  Game.RIGHTMOST_BUBBLE_POS = 460
  Game.BUBBLE_SIZE = 35;
  Game.NUM_BUBBLE_ROWS = 4;

  Game.prototype.addBubbleRow = function() {
    var start_pos = this.offset ?
      Game.BUBBLE_OFFSET_ROW_START_POS : Game.BUBBLE_ROW_START_POS;
    var options = {};
    options.vel = [0,0];
    options.game = this;

    for (var pos = start_pos;
      pos < Game.RIGHTMOST_BUBBLE_POS;
      pos += Game.BUBBLE_SIZE) {
        options.pos = [pos,Game.BUBBLE_START_Y];
        this.stillBubbles.push(new BubbleShooter.Bubble(options));
    }

    this.offset = !this.offset;
  }

  Game.prototype.addStillBubbles = function() {
    for (var i = 0; i < Game.NUM_BUBBLE_ROWS; i++) {
      this.shiftDown();
      this.addBubbleRow();
    }
  };

  Game.prototype.addMovingBubble = function(bubble) {
    this.movingBubbles.push(bubble);
  };

  Game.prototype.addCannon = function() {
    cannon = new BubbleShooter.Cannon({ game: this });
    this.cannon = cannon;
    return cannon;
  };

  Game.prototype.allObjects = function() {
    return [].concat(this.stillBubbles, this.movingBubbles,this.cannon);
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

  Game.prototype.movingBubbleToStill = function(bubble) {
    this.movingBubbles.splice(this.movingBubbles.indexOf(bubble), 1);
    this.stillBubbles.push(bubble);
  };

  Game.prototype.stillBubbleToMoving = function(bubble) {
    this.stillBubbles.splice(this.stillBubbles.indexOf(bubble), 1);
    this.movingBubbles.push(bubble);
  };

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


  Game.prototype.Neighbors = function(bubble, neighbors, toSearch, byColor) {
    var nextBubble

    neighbors.push(bubble);
    var ImmediateNeighbors = this.ImmediateNeighbors(bubble, byColor);
    ImmediateNeighbors.forEach(function(neighbor){
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
    //Bubbles that aren't somehow anchored by connection to a bubble that's
    //connected to the top are orphaned bubbles that need to fall.
    this.resetBubbleAnchorStatus();

    this.stillBubbles.forEach(function(bubble) {
      if (bubble.anchored) {
        return;
      }

      var neighbors = this.Neighbors(bubble, [], []);
      var orphan = true;
      var i = 0;

      while (orphan === true && i < neighbors.length ) {
        if (neighbors[i].isAtBoardTop()) {
          orphan = false;
        }
        i++;
      }

      if (orphan) {
        neighbors.forEach(function(neighbor) {
          this.stillBubbleToMoving(neighbor);
          neighbor.startMoving([0,2]);
        }.bind(this));
      } else {
        for (i = 0; i < neighbors.length; i++) {
          neighbors[i].anchored = true;
        }
      }

    }.bind(this));
  };

  Game.prototype.resetBubbleAnchorStatus = function () {
    this.stillBubbles.forEach(function(bubble) {
      bubble.anchored = undefined;
    });
  };

  Game.prototype.step = function () {
    this.movingBubbles.forEach(function(bubble){
      bubble.step();
    });
  };

  Game.prototype.remove = function(object) {
    if (object instanceof BubbleShooter.Cannon){
      this.cannon = undefined;
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
    return this.cannon.checkShotCounter();
  };

  Game.prototype.shiftDown = function() {
    this.stillBubbles.forEach(function(bubble) {
      bubble.shift([0,Game.BUBBLE_ROW_SPACING]);
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
