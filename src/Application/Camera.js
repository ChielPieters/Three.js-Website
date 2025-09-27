import * as THREE from 'three'
import Application from './Application.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.application = new Application()
        this.sizes = this.application.sizes 
        this.scene = this.application.scene
        this.canvas = this.application.canvas

        this.setCamera()
        this.setOrbitControls()
    }

    setCamera()
    {
        this.instance = new THREE.PerspectiveCamera
        (
            45, 
            this.sizes.width / this.sizes.height, 
            0.1, 
            100
        )
        this.instance.position.set(10, 3, 7)
        this.scene.add (this.instance)
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.minPolarAngle = 1;
        this.controls.maxPolarAngle =  Math.PI * 0.65;
        this.controls.minAzimuthAngle =  0.5;
        this.controls.maxAzimuthAngle =  Math.PI * 0.65;
        this.controls.minDistance = 8;
        this.controls.maxDistance = 20;
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}

