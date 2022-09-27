import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Mesh } from 'three';
import * as dat from 'dat.gui';

/**
 * DEBUG
 */
const gui = new dat.GUI();

/**
 * ==================
 *       TEXTURE
 * ==================
 */

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

/**
 *  Base
 *  For the base, we need:
 *  - canvas
 *  - scene
 *  - material
 * 
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Material used for the mesh of the objects

/**
 * =====================================
 * 
 *         MeshBasicMaterial
 * 
 * =====================================
 */

/*
  
    MeshBasicMaterial is probably the most "basic" material.
    This material is --- not affected by lights --- .
   
    - Map
      The map property will apply a texture on the surface of the geometry:
    
    - Color
      The color property will apply a uniform color on the surface of 
      the geometry. When you are changing the color property directly, 
      you must instantiate a Color class. You can use many different formats:
    
    - Opacity
      To work opacity we should also use 'transparent true'

    - Wireframe
      The wireframe property will show the triangles that compose your geometry with a 
      thin line of 1px regardless of the distance of the camera:

    material.wireframe = true

    - Opacity
      The opacity property controls the transparency but, 
      to work, you should set the transparent property to true to inform Three.js that this
      material now supports transparency:

    AlphaMap
      Now that the transparency is working, we can use the alphaMap 
      property to control the transparency with a texture:

    - Side
      The side property lets you decide which side of a face is visible.
      By default, the front side is visible (THREE.FrontSide), 
      but you can show the backside instead (THREE.BackSide) or 
      both (THREE.DoubleSide):
      Try to avoid using THREE.DoubleSide because rendering both sides 
      means having twice more triangles to render.
*/


// TODO : Uncomment to test basic material

/*
const material = new THREE.MeshBasicMaterial({
    map : doorColorTexture,
    color : 'red'
})

// Another way
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture
// material.color = new THREE.Color('blue');
// material.wireframe = true;
// Opacity is used with transparent 
// material.opacity = 0.9
// material.transparent = true

//=========================
//
//      ALPHA MAP
//
// Alpha map ( inside white is visible, outside black - not visible
// It's used with transparent : true
//=========================

material.alphaMap = doorAlphaTexture;

// Side lets you decide which side of a face is visible
// THREE.FrontSide (default)
// THREE.BackSide
// THREE.DoubleSide
material.side = THREE.DoubleSide

*/


/**
 * ==============================
 * 
 *     Mesh normal material 
 * 
 * ==============================
 */

/***
    You can use Normals for many things like 
    --- calculating how to illuminate the face or 
    --- how the environment should reflect or refract on the geometries' surface.

    When using the MeshNormalMaterial, the --- color will just display the normal relative's orientation to the camera. ----
    If you rotate around the sphere, you'll see that the color is always the same, regardless of which part of the sphere you're looking at.

    While you can use some of the properties we discovered with the MeshBasicMaterial like 
    wireframe, 
    transparent,      
    opacity and 
    side, there is also a new property that you can use, which is called 
    --- flatShading ---:
    
    --- flatShading---  will flatten the faces, meaning that the normals won't be interpolated between the vertices.

    --- MeshNormalMaterial can be useful to debug the normals ---
*/
 
// TODO : Unncomment to text normal material
/*
 const material = new THREE.MeshNormalMaterial()
//  material.wireframe = true;
 material.flatShading = true

*/


/**
 * ==============================
 * 
 *     Mesh matcap material 
 * 
 * ==============================
 * 
 * 
 * 
 * MatCap shader uses an image of a sphere as a view-space environment map. 
 * - encodes the material color and shading.
 * - does not respond to lights since the matcap image file encodes baked lighting. 
 * - It will cast a shadow onto an object that receives shadows 
     (and shadow clipping works), but it will not self-shadow or receive shadows.
 *  The image contains pre baked colours and shading.

     simulate light without having light
     MeshMatcapMaterial is a fantastic material because of how great it can look while being very performant.

 */
// TODO : Unncomment to text normal material

/*
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
*/


/*
const metarial = new THREE.MeshDepthMatreial()
*/

/**
 * Mesh lamber material - react to light
 */


// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0xff000)


/*
const material = new THREE.MeshToonMaterial()
*/

//We see a gradent instead of a clear separatin bec
//the gradient is small and the ---magFilter--- tries to fix it with the
// ---mipmapping---
// Set the --minFilter--- and ---magFilter to THREE.NearestFilter

//We can also deactivate th mipmapping with (bec we use Nearestfilter)
//gradientTexture.generateMipmaps = false

/*
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false;

material.gradientMap = gradientTexture
*/

/*
const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.45;
// material.roughness = 0.65;
material.map = doorColorTexture

//The normalMap will fake the normal orientation and add 
//details on the surface regardless of the subdivision:
material.normalMap = doorNormalTexture
material.normalScale.set(0.5,0.5)

//alphaMap - erase texture
//To use alphaMap, we must add transparent = true
material.transparent = true;
material.alphaMap = doorAlphaTexture

//ambient occlusion map - will add shadows where the texture is dark
//We must add second set of UV named uv2  cordinates
//we;re going to duplicate current cordinates

// aoMap
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;

material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1

material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture

gui.add(material, 'metalness')
   .min(0)
   .max(1)
   .step(0.00001);

   gui.add(material, 'roughness')
   .min(0)
   .max(1)
   .step(0.00001);

   gui.add(material, 'displacementScale')
   .min(0)
   .max(1)
   .step(0.01);

*/

//Environment map 
//The environment map is like an image of what's surrounding the scene.
// You can use it to add reflection or refraction to your objects. 
//It can also be used as lighting information.

//We haven't covered it yet, but you can use it with many of the materials we saw.

//First, let's setup a very simple MeshStandardMaterial with the debug UI as we did earlie

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// To add the environment map to our material, we must use the envMap property. 
//Three.js only supports cube environment maps. Cube environment maps are 6 images 
//with each one corresponding to a side of the environment.

// You can find multiple environment maps in the /static/textures/environmentMap/ folder.

// To load a cube texture, you must use the CubeTextureLoader instead of the TextureLoader.

// Instantiate the CubeTextureLoader before instantiating the 
// material and call its load(...) method but use an array of paths instead of one path:

const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

material.envMap = environmentMapTexture
/**
 * =====================
 *        OBJECTS
 * =====================
 */

// Sphere
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,64,64),
    material
)
//used for aomap
sphere.geometry.setAttribute(
  'uv2', 
  new THREE.BufferAttribute(
    sphere.geometry.attributes.uv.array, 2
  )
)


//Plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 1, 1, 100, 100 ),
    material,
)
plane.material.side = THREE.DoubleSide;
plane.position.x = -1.5;
//used for aomap
//access the geometry
console.log(plane.geometry.attributes.uv)
plane.geometry.setAttribute(
  'uv2', 
  new THREE.BufferAttribute(
    plane.geometry.attributes.uv.array, 2
  )
)

//Torus
const torus = new THREE.Mesh(
    new THREE.TorusGeometry( 0.3, 0.1, 64, 128 ),
    material
)
torus.position.x = 1.5;
//used for aomap
torus.geometry.setAttribute(
  'uv2', 
  new THREE.BufferAttribute(
    torus.geometry.attributes.uv.array, 2
  )
)
scene.add( sphere, plane, torus)


/**
 *  This light globally illuminates all objects in the scene equally.
    This light cannot be used to cast shadows as it does not have a direction.
 */
const ambientLight = new THREE.AmbientLight('white', 0.5)
scene.add(ambientLight)

/**
 * A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.

This light can cast shadows - see PointLightShadow page for details.
 */
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add( pointLight )


/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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

    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    plane.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()