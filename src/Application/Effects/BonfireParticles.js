import * as THREE from 'three'
import Application from '../Application.js';
import particleFire from 'three-particle-fire'

particleFire.install({ THREE: THREE })

export default class BonfireEffect {
    constructor(scene, camera, height) {

        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources
    
        this.scene = scene 
        this.camera = camera
        this.height = height
   
        // Configuratie
        const fireRadius = 0.2
        const fireHeight = 1.7
        const particleCount = 250

        // Particle fire setup
        this.geometry = new particleFire.Geometry(fireRadius, fireHeight, particleCount)
        this.material = new particleFire.Material({ color: 0xdbae58})
        this.material.setPerspective(this.camera.fov, this.height)
        

        this.particle = new THREE.Points(this.geometry, this.material)
        this.particle.position.set(-2, 0, -3)

        this.scene.add(this.particle)
    }

    update(delta) {
        this.material.update (delta * 600) //Delta = Seconde maar Bonfire heeft miliseconde nodig, daarom *600
    }
}
