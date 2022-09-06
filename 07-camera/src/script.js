import './style.css'
import * as THREE from 'three'

//Orbit controls allow the camera to orbit around a target. by dragging
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Cursor
const cursor = { x:0, y:0 };

// We want value between 0 - 1
// The mouse positoin from left to right is (0 - viewport size)
// we will move only in the render, so render size is our  max width
// we want negative and positive valuе from 0 to 1 => -5 => [-0.5,0.5]
window.addEventListener( "mousemove" , (event) => {
    cursor.x = (event.clientX /  sizes.width) - 0.5 ;
    cursor.y = - ((event.clientY / sizes.height) - 0.5 );
})

// 1) Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// 2) Scene
const scene = new THREE.Scene()

// 3) Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(
    75, // FOV should be 45-75
    sizes.width / sizes.height, 
    0.1,
    100 
)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

//Controls
const controls = new OrbitControls( camera, canvas);

//add speed to rotating, starts faster and decrease speed slowly with easing
//should be updated on every frame - put it on requestAnimationFrame
controls.enableDamping = true; //Add acceleration

const animate = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects 
    // camera.position.x = cursor.x * 10;
    // camera.position.y = cursor.y * 10;

    /*
    //Math.PI * 2 - full rotation
    camera.position.x = Math.sin( cursor.x * Math.PI * 2) * 3;
    camera.position.z = Math.cos( cursor.x  * Math.PI * 2) * 3;
    camera.position.y = cursor.y * 5;
    camera.lookAt(mesh.position)
    */

    //Update controls  - used for (controls.enableDamping = true)
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call animate() again on the next frame
    window.requestAnimationFrame(animate)
}

animate()