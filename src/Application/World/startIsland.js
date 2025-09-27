import * as THREE from 'three'
import Application from '../Application.js';
import WaterShader from '../../shaders/water/WaterShader.js';
import BonfireEffect from '../Effects/BonfireParticles.js'
import FireflyParticles from '../Effects/Fireflies.js'
import LeafParticleSystem from '../Effects/LeafParticles.js'



export default class StartIsland
{
    constructor(application)
    {
        this.application = application;
        this.scene = this.application.scene;
        this.camera = this.application.camera;
        this.resources = this.application.resources;
        this.mixers = [];

        const clock = new THREE.Clock()

        const ambientLight = new THREE.AmbientLight(0xFFA865, 0.5);
        this.scene.add(ambientLight);

        // Voeg een directional light toe (zorgt voor schaduwen en diepte)
        const directionalLight = new THREE.DirectionalLight(0xFFA865, .5); // Witte lichtbron
        directionalLight.position.set(5, 3, 0); // Zet de lichtbron op een positie
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;  // Standaard is 512, hogere waarde betekent scherpere schaduwen
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.bias = -0.005; // Dit helpt soms bij het verminderen van artefacten in de schaduw
        this.scene.add(directionalLight);

        const targetObject = new THREE.Object3D()
        targetObject.position.set(2, 0, 0)
        this.scene.add(targetObject)

        directionalLight.target = targetObject
        this.scene.add(directionalLight)
        
        const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1); // 1 = grootte van de helper
        //this.scene.add(lightHelper);

        //Setup
        this.resource = this.resources.items.startislandModel

        //Watershader
        this.waterShader = new WaterShader()

        //Bonfire Effect
        this.bonfireEffect = new BonfireEffect(
            this.scene,
            this.application.camera.instance, // ← de THREE.PerspectiveCamera
            window.innerHeight                // of this.application.sizes.height
        )

         //Firefly Effect
         this.fireflyEffect = new FireflyParticles(
            this.scene,
            this.application.camera.instance, // ← de THREE.PerspectiveCamera
            window.innerHeight                // of this.application.sizes.height
        )

        // Leaf Effect
        const leafModel = this.resources.items.leafModel.scene.children[0] 
       
        const origin = new THREE.Vector3(2, .75, -3) // bijv. positie van de boom
        this.leafParticles = new LeafParticleSystem(this.scene, leafModel, this.count, origin)

     
        this.setModel()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setAnimation()

    }
        setModel()
        {
            this.model = this.resource.scene            
        }

        setTextures()
        {
            this.textures = {}
            this.textures.color = this.resources.items.startislandTexture
            this.textures.color.colorSpace = THREE.SRGBColorSpace
            this.textures.color.flipY = false
        }
        
        setMaterial()
        {
            this.material = new THREE.MeshBasicMaterial({ map: this.textures.color })     
           
        }

        setMesh() {
            this.model.traverse((child) => {
                if (child.isMesh) {
                    // Check of het een water mesh is
                    if (child.name === 'Water_Pond' || child.name === 'Water_Stream') {
                        child.material = this.waterShader.getMaterial()
                    } else {
                        child.material = this.material
                    }
                }
            })
            this.model.rotation.y = Math.PI * 1
            this.scene.add(this.model)
            
        }

        setAnimation()
        {
            if (this.resource.animations && this.resource.animations.length > 0) {
                this.mixer = new THREE.AnimationMixer(this.model);

                this.resource.animations.forEach((clip) => {
                    const action = this.mixer.clipAction(clip);
                    action.play();
                    console.log("Animatie gestart:", clip.name);
                });

                this.application.mixers.push(this.mixer); // ← deze lijst moet in Application bestaan
            }
        }    

        update(elapsedTime) {
            if (this.waterShader) {
                this.waterShader.update(elapsedTime)
            }
            
            if (this.bonfireEffect) {
                this.bonfireEffect.update(this.application.time.delta * 0.001) // delta in seconden
            }

            if (this.fireflyEffect) {
                this.fireflyEffect.update(elapsedTime)
            }

            if (this.leafParticles) {
                this.leafParticles.update() 
            }  
        }
}

