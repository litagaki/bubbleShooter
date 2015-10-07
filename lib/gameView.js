(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var GameView = BubbleShooter.GameView = function(options) {
    this.ctx = options.ctx;
    this.game = options.game;
    this.$modal = options.$modal
    this.cannon = this.game.addCannon();

    this.instructionAlert();
  };

  GameView.prototype.bindKeyHandlers = function() {
    var cannon = this.cannon;

    key ("j", function() { cannon.swivel("-") });
    key ("l", function() { cannon.swivel("+") });
    key("i",  function() { cannon.fire() });
  };

  GameView.prototype.start = function() {
    var gameView = this;
    this.timerId = setInterval(
      function() {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        if (gameView.game.isGameOver()){
          this.stop();
          this.gameOverAlert();
        }
      }.bind(this), 5
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function() {
    clearInterval(this.timerId);
  };

  GameView.prototype.instructionAlert = function() {
    var alert = '<p>Use the J and L keys to pivot the bubble cannon<br>left and right and the I key to shoot. Try to <br>get at least three in a row of the same color bubbles.<br><button>Got It</button></p>';
    this.$modal.append($(alert));
    this.$modal.addClass("active");
    this.$modal[0].onclick = function() {
      this.$modal.empty();
      this.$modal.removeClass("active");
    }.bind(this);
  };

  GameView.prototype.gameOverAlert = function() {
    var alert = "<p>GAME OVER</p>"
    this.$modal.append($(alert));
    this.$modal.addClass("active");
  }

})();
