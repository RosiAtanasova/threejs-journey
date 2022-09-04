"use strict"
import './style.css'
import * as THREE from 'three'


// 1) Canvas

const canvas = document.querySelector('canvas.webgl')

// 2) Scene

const scene = new THREE.Scene()

// 3) Objects

// Single object
const geometry = new THREE.BoxGeometry( 1, 1, 1 )
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh( geometry, material )
// scene.add(mesh);

// 3) Group with 3 cubes
const group = new THREE.Group();
group.position.x = 0.5;
group.position.y = -0.4;
group.rotation.y = -0.8;
scene.add( group );

// Create the mesh directly
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), //geometry
    new THREE.MeshBasicMaterial( { color : '#f3f097'}) //material
);
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), //geometry
    new THREE.MeshBasicMaterial( { color : '#dfa9b2'}) //material
);
cube2.position.x = -2;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), //geometry
    new THREE.MeshBasicMaterial( { color : '#8bbbdd'}) //material
)
cube3.position.x = 2;
group.add(cube3)

// Poisition
mesh.position.x = 0.7;
mesh.position.y = 0.5;
mesh.position.z = 1;
mesh.position.set( 0.7, -0.6, 1 )
// scene.add(mesh)

//Scale
mesh.scale.x = 0.2;
mesh.scale.y = 0.5
mesh.scale.z = 0.5;
mesh.scale.set( 2, 0.5, 0.5 )

// Rotation
mesh.rotation.reorder('xyz')
mesh.rotation.x = Math.PI //half rotation
mesh.rotation.y = Math.PI * 0.25 

/**
 * --- AXESHELPER ---
 *  
    An axis object to visualize the 3 axes in a simple way.
    The X axis is red. 
    The Y axis is green. 
    The Z axis is blue.
 */
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

// Length give you distance between 
// position and the center of the scene
console.log(`Red cube length is ${group.position.length()}`)


/**
 * Sizes
 */
const sizes = {
    width : 800,
    height : 600
};


// 4)  Camera
const camera = new THREE.PerspectiveCamera(
    75, 
    sizes.width / sizes.height
);
camera.position.z = 3;
scene.add( camera );

//camera look at stright to cube
camera.lookAt( mesh.position )

// Distance to another Vector /camera
console.log(`Position from mesh - the red cube to the camera is ${ group.position.distanceTo( camera.position ) } `);


// 5)  Renderer

const renderer = new THREE.WebGLRenderer({
    canvas : canvas
});
renderer.setSize( sizes.width, sizes.height );
renderer.render( scene, camera);