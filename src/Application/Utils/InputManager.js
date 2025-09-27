import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'



// In InputManager.js
class InputManager {
    constructor(scene, camera, tweenGroup) {
        this.scene = scene;
        this.camera = camera;
        this.tweenGroup = tweenGroup;  // Sla de tweenGroup op
        
        window.addEventListener('click', this.onClick.bind(this));
    }

    onClick(event) {
      
        // Muispositie normaliseren
        let mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);

        const intersects = raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            const naviClick = intersects[0].object;

            // Specifieke objecten checken
            if (naviClick.name === 'Navi_Contact') {
                new TWEEN.Tween(this.camera.position, this.tweenGroup)
                    .to({ x: 4, y: 4, z: 4 }, 2000)
                    .easing(TWEEN.Easing.Cubic.InOut) 
                    .start();
                    
            
            }
            if (naviClick.name === 'Navi_Livestream') {
                new TWEEN.Tween(this.camera.position, this.tweenGroup)
                    .to({ x: 14, y: -4, z: 4 }, 2000)
                    .easing(TWEEN.Easing.Cubic.InOut)
                    .start();
            }
        }
    }

    update() {
        if (this.tweenGroup) {
            this.tweenGroup.update()
        }
    
    }
}

export default InputManager;
