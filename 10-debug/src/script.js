import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { GUI } from 'dat.gui'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Debug with GUI
const gui = new GUI({
    closed: true,
    width : 400
});
const parameters = {
    color : 0xffff00,
    spin : () =>
    {
        gsap.to( 
            mesh.rotation, { 
                duration : 1, 
                y : mesh.rotation.y + 0.5
            }
        )
    }
};

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Debug
/**
 * Libs for debugging
 * 
 * https://github.com/dataarts/dat.gui
 * Documentation:
 * https://github.com/dataarts/dat.gui/blob/19c4725d03456ce5049e7131907fc0470326d5ae/API.md
 * 
 * https://github.com/freeman-lab/control-panel
 * https://github.com/automat/controlkit.js
 * https://github.com/lo-th/uil
 * https://cocopon.github.io/tweakpane/
 * https://github.com/colejd/guify
 * https://github.com/wearekuva/oui
 * 
 */

gui
    .addColor(parameters, 'color')
    .onChange( () => {
        material.color.set( parameters.color )
    });
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');
gui.add(parameters, 'spin');
gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('Mesh position y : ');




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()