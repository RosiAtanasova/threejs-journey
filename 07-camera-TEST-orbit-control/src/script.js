import './style.css'
import * as THREE from 'three'

//Orbit controls allow the camera to orbit around a target. by dragging
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// 1) Canvas
const canvas = document.querySelector('canvas.webgl')


// 2) Scene
const scene = new THREE.Scene()


// 3) Object - Sphere
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry( 15, 32, 16 ),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
)
scene.add(mesh);

const axesHelper = new THREE.AxesHelper( 55 );
scene.add( axesHelper );

// Sizes
const sizes = {
    width: 800,
    height: 600
}

const aspectRatio = sizes.width / sizes.height;

// 4) Camera
const camera = new THREE.PerspectiveCamera( 75,aspectRatio, 0.1, 100 )
camera.position.z = 80
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
controls.enableDamping = true; //Add acceleration

controls.addEventListener('change', () => console.log("Controls Change"))
controls.addEventListener('start', () => console.log("Controls Start Event"))
controls.addEventListener('end', () => console.log("Controls End Event"))
controls.dampingFactor = .01;

controls.keys = {
    LEFT: "ArrowLeft", //left arrow
    UP: "ArrowUp", // up arrow
    RIGHT: "ArrowRight", // right arrow
    BOTTOM: "ArrowDown" // down arrow
}

const animate = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update controls  - used for (controls.enableDamping = true)
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call animate() again on the next frame
    window.requestAnimationFrame(animate)
}

animate()