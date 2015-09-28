(function(){
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var GameView = BubbleShooter.GameView = function(ctx,game) {
    this.ctx = ctx;
    this.game = game;
  };

  GameView.prototype.start = function() {
    this.game.draw(this.ctx);
  }

})();
