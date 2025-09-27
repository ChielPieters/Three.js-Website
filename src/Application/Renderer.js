import * as THREE from 'three'
import Application from './Application.js';

export default class Renderer
{
    constructor()
    {
        this.application = new Application()
        this.canvas = this.application.canvas
        this.sizes = this.application.sizes 
        this.scene = this.application.scene
        this.camera = this.application.camera
        this.setRenderer()
        
    }

    setRenderer()
    {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
       })
       this.renderer.physicallyCorrectLights = true
       this.renderer.outputEncoding = THREE.sRGBEncoding
       this.renderer.toneMapping = THREE.CineonToneMapping
       this.renderer.shadowMap.enabled = true
       this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
       this.renderer.setClearColor('#211d20')
       this.renderer.setSize(this.sizes.width, this.sizes.height)
       this.renderer.setPixelRatio(this.sizes.pixelRatio)
    }

    resize()
    {
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.renderer.render(this.scene, this.camera.instance)
    }
}
