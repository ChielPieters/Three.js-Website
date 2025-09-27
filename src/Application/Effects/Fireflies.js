// src/Effects/ParticleSystem.js
import * as THREE from 'three'
import * as dat from 'dat.gui'
import firefliesVertexShader from '../../shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from '../../shaders/fireflies/fragment.glsl'

export default class FireflyParticles {
    constructor(scene, options = {}) {
        this.scene = scene

        

        // Configuratie met defaults
        const {
            count = 50,
            spread = 7
        } = options

        this.count = count

        // Geometrie
        this.geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(count * 3)
        const scale = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * spread
            positions[i * 3 + 1] = (Math.random() * 1.5) 
            positions[i * 3 + 2] = (Math.random() - 0.5) * spread
            scale[i] = (Math.random())
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scale, 1))

        this.uniforms = {
            uTime: { value: 0},
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2)},
            uSize: { value: 70 }
        }
      
        // Materiaal
        this.Firefliesmaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,

            
         })

         // Debug
        //const gui = new dat.GUI({width: 400})
        //gui.add(this.Firefliesmaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('FirefliesSize')

        // Mesh
        this.particles = new THREE.Points(this.geometry, this.Firefliesmaterial)
        this.scene.add(this.particles)
    }

    update(elapsedTime) {
        this.uniforms.uTime.value = elapsedTime;
    }
    
}
