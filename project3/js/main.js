/**
 * main.js
 *
 * main file for the project
 *
 * define the render and init functions
 */

var scene, camera, renderer;
var orbitControls;
var clock;

var old_val = 1;
var orig_height;


function render()
{
  'use strict';
  renderer.render(scene.scene, camera);
}

function animate() {
  'use strict';

  var delta = clock.getDelta();
  scene.updateScene(delta);
  render();
  requestAnimationFrame(animate);
}

function init()
{
  'use strict';
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  orig_height = window.innerHeight;

  scene = new Scene();
  camera = initCamera(scene);
  clock = new THREE.Clock(true);
  orbitControls = new THREE.OrbitControls(camera, );
  orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
  orbitControls.enabled = true;
  orbitControls.enableZoom = false;
  orbitControls.enablePan = false;
  orbitControls.enableDamping = false;
  orbitControls.autoRotate = true;
  orbitControls.autoRotateSpeed = 10;
  render();

  window.addEventListener('resize', onResize, false);
  window.addEventListener('keydown', onKeyDown, false);
}                     

function onResize() {
  'use strict';
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateFixedPerspective(window.innerWidth, window.innerHeight);
}


function onKeyDown(e) {
  'use strict';

  switch (e.keyCode) {
    case 65: // A
    case 97: // a
      scene.scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }
      });
      break;

    case 69: // E
    case 101: // e
      scene.scene.traverse(function (node) {
        if (node instanceof THREE.AxisHelper) {
          node.visible = !node.visible;
        }
      });
      break;

    default:
      break;
  }
}

function initCamera(scene) {
  'use strict';

  var camera = initFixedPerspective(scene)
  return camera;
}

function initFixedPerspective(scene) {
  'use strict';
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
  camera.position.set(-scene.getWidth(), 50, scene.getHeight())
  camera.lookAt(scene.scene.position)
  scene.scene.add(camera)
  return camera;
}

function updateFixedPerspective(w, h) {
  if (w > 0 && h > 0) {                                                                                   
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    //orbitControls.update();
  }
}
