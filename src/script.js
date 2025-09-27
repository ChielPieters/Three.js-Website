import Application from './Application/Application.js';
const application = new Application(document.querySelector('canvas.webgl'))

// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import { Tween, Group, Easing } from '@tweenjs/tween.js'
// import * as dat from 'dat.gui'
// import waterVertexShader from './shaders/water/vertex.glsl'
// import waterFragmentShader from './shaders/water/fragment.glsl'
// import particleFire from 'three-particle-fire';


// particleFire.install( { THREE: THREE } );

// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI({width: 400})
// const debugObject = {}

// //Tween Group
// const tweenGroup = new Group()
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// //Water Color
// debugObject.deepColor = '#1a3c50'
// debugObject.surfaceColor = '#1a7fdf'

// const waterMaterial = new THREE.ShaderMaterial({
//     vertexShader: waterVertexShader,
//     fragmentShader: waterFragmentShader,
//     uniforms:
//     {
//         uTime: { value: 0},

//         uBigWavesElevation: {value: 0.008},
//         uBigWavesFrequency: {value: new THREE.Vector2(5.23, 4.583)},
//         uBigWavesSpeed: { value: 0.324},

//         uSmallWavesElevation: { value: 0.042},
//         uSmallWavesFrequency: { value: 1.1},
//         uSmallWavesSpeed: { value: 0.24},
//         uSmallWavesIterations: { value: 3},

//         uDeepColor: { value: new THREE.Color(debugObject.deepColor)},
//         uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor)},
//         uColorOffset: { value: 0.062 }, 
//         uColorMultiplier: { value: 7.9 }, 

//     }
// })
// //Water Debug
// gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
// gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
// gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
// gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')

// gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
// gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
// gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
// gui.add(waterMaterial.uniforms.uSmallWavesIterations, 'value').min(0).max(5).step(1).name('uSmallWavesIterations')

// gui
//     .addColor(debugObject, 'deepColor')
//     .name('deepColor')
//     .onChange(() =>
//     {
//         waterMaterial.uniforms.uDeepColor.value.set(debugObject.deepColor)
//     })

// gui
//     .addColor(debugObject, 'surfaceColor')
//     .name('surfaceColor')
//     .onChange(() =>
//     {
//         waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor)
//     })
//     gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
//     gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')


// /**
//  * Loaders
//  */
// // Texture loader
// const textureLoader = new THREE.TextureLoader()


// // Draco loader
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('draco/')

// // GLTF loader
// const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)

// /**
//  * Textures
//  */
// const bakedTexture = textureLoader.load('baked_StartIsland.jpg')
// bakedTexture.flipY = false
// bakedTexture.colorSpace = THREE.SRGBColorSpace
// /**
//  * Materials
//  */
// // Baked material
// const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

// /**
//  * Model
//  */
// gltfLoader.load(
//     'start_island.glb',
//     (gltf) =>
//     {

//         gltf.scene.traverse((child) =>
//         {
//             child.material = bakedMaterial
//         })

//         gltf.scene.rotation.y = Math.PI / 1;
//         const waterPondMesh = gltf.scene.children.find(child => child.name === 'Water_Pond')
//         const waterStreamMesh = gltf.scene.children.find(child => child.name === 'Water_Stream')

//         waterStreamMesh.material = waterMaterial
//         waterPondMesh.material = waterMaterial
  
//         scene.add(gltf.scene)
//     }
// )

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 10
// camera.position.y = 3
// camera.position.z = 7
// scene.add(camera)

// // Orbit Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// //controls.minPolarAngle = 1;
// //controls.maxPolarAngle =  Math.PI * 0.65;
// //controls.minAzimuthAngle =  0.5;
// //controls.maxAzimuthAngle =  Math.PI * 0.65;
// //controls.minDistance = 8;
// //controls.maxDistance = 20;

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// window.addEventListener('click', (event) => {
//     // Muis positie normaliseren (-1 tot 1)
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

//     // Raycaster vanuit de camera door de muis
//     raycaster.setFromCamera(mouse, camera);

//     // 3. Check intersecties
//     const intersects = raycaster.intersectObjects(scene.children, true); // 'true' betekent dat hij ook in groepen kijkt

//     if (intersects.length > 0) {
//         const naviClick = intersects[0].object;

//         // Specifiek onderdeel checken
//         if (naviClick.name === 'Navi_Contact') {
//             new Tween(camera.position, tweenGroup)
//             .to({ x: 4, y: 4, z: 4 }, 2000)
//             .easing(Easing.Cubic.InOut)
//             .start();
//         }
//         if (naviClick.name === 'Navi_Livestream') {
//             new Tween(camera.position, tweenGroup)
//             .to({ x: 14, y: -4, z: 4 }, 2000)
//             .easing(Easing.Cubic.InOut)
//             .start();
//         }
//     }
// });

// var fireRadius = 0.1;
// var fireHeight = 0.9;
// var particleCount = 250;
// var height = window.innerHeight;

// var geoBonfire = new particleFire.Geometry( fireRadius, fireHeight, particleCount );
// var matBonfire = new particleFire.Material( { color: 0xff2200  } );
// matBonfire.setPerspective( camera.fov, height );
// var particleBonfire = new THREE.Points( geoBonfire, matBonfire );

// particleBonfire.position.x = -1.93; 
// particleBonfire.position.z = -2.55; 
// scene.add( particleBonfire );
 

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// function update () {

//     var delta = clock.getDelta() / 3;
  
//     requestAnimationFrame( update );
  
//     particleBonfire.material.update( delta );
//     renderer.render( scene, camera );
  
//   }
//   update()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     //Update Water
//     waterMaterial.uniforms.uTime.value = elapsedTime

//     // Update controls
//     controls.update()

//     //Update ClickCheck
//     tweenGroup.update();

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()


