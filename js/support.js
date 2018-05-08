var support = (function () {
  "use strict"

  function randomize(min, max) {
    return Math.random() * (max-min) + min;
  }

  return {
    randomize: randomize
  }

})();
