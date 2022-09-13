import './style.scss'

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xe9e9e9 ); 

// Create camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera );

// Position camera
camera.position.setZ(4);

// Render Car
const loader = new GLTFLoader();

let body;
loader.load( './bodywork.gltf', function ( gltf ) {

  body = gltf.scene;

  body.rotation.x = -3.14159/2;
  body.rotation.y = 0.2
  body.position.setZ(0.7);
  body.position.setX(-0.6);
  body.position.setY(-1);
  body.metalness = 1;
  body.roughness = 0;

	scene.add( gltf.scene );

}, undefined, function ( error ) {
	console.error( error );
} );

let chassis;
loader.load( './chassis.gltf', function ( gltf ) {

  chassis = gltf.scene;

  chassis.rotation.x = -3.14159/2;
  chassis.rotation.y = 0.2
  chassis.position.setZ(0.7);
  chassis.position.setX(-0.6);
  chassis.position.setY(-1);
  chassis.metalness = 1;
  chassis.roughness = 0;

	scene.add( gltf.scene );

}, undefined, function ( error ) {
	console.error( error );
} );

// Add lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,5,5);
scene.add(pointLight);
// const lighthelper = new THREE.PointLightHelper(pointLight);
// scene.add(lighthelper);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Animate scene
let t = 0;
function animate() {
  requestAnimationFrame(animate);

  // rotation at start
  if (t > -2000) scene.rotation.y += -0.03;
  else scene.rotation.y = -3.14519/7;

  // zoom into front wheel
  if (t < -4000 && t > -5000) {
    camera.position.setZ(2.3);
    camera.position.setX(0.8);
    camera.position.setY(-0.5);
  } else {
    camera.position.setZ(4);
    camera.position.setX(0);
    camera.position.setY(0);
  }

  renderer.render(scene, camera);
}

animate();

// Scroll animation
function moveCamera() {
  t = document.body.getBoundingClientRect().top;
  console.log(t);

  // lift bodywork
  if (t < -100) {
    body.position.y = (t + 100) * -0.005;
  } else {
    body.position.setY(-1);
  }

  // hide chassis at end
  if (t < -5000) chassis.visible = false;
  else chassis.visible = true;
}

document.body.onscroll = moveCamera;