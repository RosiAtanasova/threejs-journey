console.log(THREE)
/**
 * --- SCENE ---
 * Like a container
 * We put objects, models, lights etc
 * We ask THREE JS to render that scene
 

 * --- MESH ---
 * Visible object is Mesh
 * Combination of geometry (the shape) and material (how it looks)

 *  --- CAMERA ---
 * It is not visible
 * Serve as point of view when doing a render
 * Can have multiple and switch beween them
 * We will use -- PerspectiveCamera
 * 
 *      -- Fist param - Field of view
 *      Verticle vision angle / in degrees
 *      also called  - fov
 *      For this example we will use 75 degree angle
 * 
 *      -- Second param - Aspect ratio
 *      The width of the render divided by the height of the render
 * 
 
 * --- RENDERER ---
 * Render the scene from the camera point of view
 * Result drawn into a canvas
 * 
 */

// Scene
const scene = new THREE.Scene();

// Object - red cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color : 'red'} );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);

// Sizes
const sizes = {
    width : 800,
    height : 600
}
const aspectRatio = sizes.width / sizes.height;

// Camera
const camera = new THREE.PerspectiveCamera( 75, aspectRatio );
//move camera backward
camera.position.z = 3;
scene.add( camera );

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector('canvas.webgl')
})
renderer.setSize( sizes.width, sizes.height );
renderer.render( scene, camera );