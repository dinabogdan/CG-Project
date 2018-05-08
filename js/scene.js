var sceneSetup = (function () {
  "use strict"

  var treeTexture = THREE.ImageUtils.loadTexture('textures/tree.jpg');

  function createRoad(zPosition) {
    var road = new THREE.Mesh(
      new THREE.BoxGeometry(2000, 1, 250),
      new THREE.MeshLambertMaterial({
          map: THREE.ImageUtils.loadTexture('textures/road.jpg')
      }),
      0
    );

    road.name = "myRoad";
    road.position.y = 1;
    road.position.z = zPosition;
    game.scene.add(road);
  }

  function createWater(zPosition) {
    var water = new THREE.Mesh(
      new THREE.BoxGeometry(2000, 1, 250),
      new THREE.MeshLambertMaterial({
          map: THREE.ImageUtils.loadTexture('textures/water.jpg')
      }),
      0
    );

    water.name = "myWater";
    water.position.y=1;
    water.position.z=zPosition;
    game.scene.add(water);
  }

  function createTree(x, z) {
    var treeBaseWidth = support.randomize(15, 22);

    var tree = new THREE.Mesh(
      new THREE.CylinderGeometry(1, treeBaseWidth, 60, 9, 9, false),
      new THREE.MeshLambertMaterial({
        ambient: 0x003311 * support.randomize(0,5),
        map: treeTexture
      }),
      0
    );

    var stump = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 20, 9, 9, false),
      new THREE.MeshLambertMaterial({ ambient: 0x552211}),
      0
    );

    tree.add(stump);
    stump.position.y = -40;
    tree.name = "someTree";
    tree.position.set(x, 40, z);
    game.scene.add(tree);
  }

  function setupSceneLight () {
    var ambientLight = new THREE.AmbientLight(0xcccccc);
    game.scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 200, -50);
    game.scene.add(spotLight);
  }

  function addObjectsToScene() {
    var grassTexture = THREE.ImageUtils.loadTexture('textures/grass.png');
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(25, 25);

    var material = new Physijs.createMaterial(
      new THREE.MeshLambertMaterial({map: grassTexture}),
      0.9,
      0.1
    );

    var ground = new Physijs.BoxMesh(
      new THREE.BoxGeometry(2000, 1, 2000),
      material,
      0
    );

    ground.name = "ground";
    ground.position.y = 0;
    game.scene.add(ground);

    createRoad(-100);

    for(var i = 0; i<20; i++){
      createTree(support.randomize(-500, 500), support.randomize(-250, -320));
    }

    createRoad(-500);

    createWater(-900);

    setupSceneLight();
  }

  return {
    addObjectsToScene: addObjectsToScene
  }
})();
