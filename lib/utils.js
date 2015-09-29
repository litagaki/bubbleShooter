(function() {
  if (typeof BubbleShooter === "undefined") {
    window.BubbleShooter = {};
  }

  var Util = BubbleShooter.Util = {};

  var VectorAdd = Util.VectorAdd = function(vector1, vector2) {
    return [vector1[0] + vector2[0], vector1[1] + vector2[1]]
  };

  var Distance = Util.Distance = function(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

})();
