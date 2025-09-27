import * as THREE from 'three'
import waterVertexShader from './vertex.glsl'
import waterFragmentShader from './fragment.glsl'

export default class WaterShader {
    constructor(waterPondMesh, waterStreamMesh) {
        this.meshes = [waterPondMesh, waterStreamMesh]

    const debugObject = {
            deepColor: '#186691',
            surfaceColor: '#9bd8ff'
    }
  
    this.uniforms = {
                uTime: { value: 0},

                uBigWavesElevation: {value: 0.01},
                uBigWavesFrequency: {value: new THREE.Vector2(5.23, 4.583)},
                uBigWavesSpeed: { value: 2},
        
                uSmallWavesElevation: { value: 0.05},
                uSmallWavesFrequency: { value: 1.1},
                uSmallWavesSpeed: { value: 0.25},
                uSmallWavesIterations: { value: 3},
        
                uDeepColor: { value: new THREE.Color(debugObject.deepColor)},
                uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor)},
                uColorOffset: { value: 0.062 }, 
                uColorMultiplier: { value: 7.9 }, 
        }
        this.Watermaterial = new THREE.ShaderMaterial({
            vertexShader: waterVertexShader,
            fragmentShader: waterFragmentShader,
            uniforms: this.uniforms,
            transparent: true
        })
    }
    update(time) {
        this.uniforms.uTime.value = time
    }
    getMaterial() {
        return this.Watermaterial
    }
}

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
