(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var GameView = BubbleShooter.GameView = function(ctx,game) {
    this.ctx = ctx;
    this.game = game;
    this.cannon = this.game.addCannon();

  };

  GameView.prototype.bindKeyHandlers = function() {
    var cannon = this.cannon;

    key ("left", function() { cannon.rotate("-") });
    key ("right", function() { cannon.rotate("+") });
    key("space",  function() { cannon.fire() });
  };

  GameView.prototype.start = function() {
    var gameView = this;
    this.timerId = setInterval(
      function() {
        gameView.game.draw(gameView.ctx);
      }, 50
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function() {
    clearInterval(this.timerId);
  };

})();
