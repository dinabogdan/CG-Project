var player = (function () {
  "use strict";

  var movementRate = 2,
    playerBox,
    playerBoxMaterial,
    finishLineZPosition = -920;

  function init() {

  }

  function moveX(movement) {
      game.camera.position.x += movementRate * movement;
      game.camera.__dirtyPosition = true;
      playerBox.position.x += movementRate * movement;
      playerBox.__dirtyPosition = true;
  }

  function moveZ(movement) {
    game.camera.position.z += movementRate * movement;
    game.camera.__dirtyPosition = true;
    playerBox.position.z += movementRate * movement;
    playerBox.__dirtyPosition = true;

    checkFinish();
  }

  function checkFinish(){
    if(playerBox.position.z <= finishLineZPosition) {
      if(game.wintext) {
        return;
      }
      text.createText('You win!', 'winText');
    }
  }

  function createPlayer() {
    playerBoxMaterial = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({
        visible: false
      }),
      0.1,
      0.5
    );

    var personMaterial = new THREE.MeshPhongMaterial({
      ambient: 0x0dd00,
      transparent: true
    });

    var playerBody = new Physijs.BoxMesh(
      new THREE.BoxGeometry(8, 5, 5),
      personMaterial,
      0.1
    );

    playerBody.position.y = -8;

    var playerLeftLeg = new  Physijs.BoxMesh(
      new THREE.BoxGeometry(2,5,5),
      personMaterial,
      0.1
    );
    playerBody.add(playerLeftLeg);
    playerLeftLeg.position.y=-5;
    playerLeftLeg.position.x=-2;

    var playerRightLeg = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2,5,5),
      personMaterial,
      0.1
    );
    playerBody.add(playerRightLeg);
    playerRightLeg.position.y = -5;
    playerRightLeg.position.x = 2;

    playerBox =new Physijs.BoxMesh(
      new THREE.CubeGeometry(10, 10, 10),
      playerBoxMaterial,
      0.1
    );
    playerBox.position.set(0, 15, 50);
    playerBox.name = "playerBox";
    playerBox.add(playerBody);
    playerBody.position.y =2;

    game.scene.add(playerBox);
  }

  return {
    init: init,
    createPlayer: createPlayer,
    moveX: moveX,
    moveZ: moveZ
  }
})();
