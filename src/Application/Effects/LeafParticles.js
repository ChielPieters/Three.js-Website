import * as THREE from 'three'

export default class LeafParticleSystem {
    
    constructor(scene, leafModel, count = 15, origin = new THREE.Vector3(0, 0, 0)) {
        this.scene = scene
        this.leafModel = leafModel
        this.leaves = []
        this.velocities = []
        this.origin = origin
        this.colors = 
         [
            new THREE.Color(0x53784b), // Groen
            new THREE.Color(0x5b962c), // Fel Groen
            new THREE.Color(0xabb52f)  // Gele kleur
        ];

            this.leafModel.traverse((child) => {
            if (child.isMesh) {
                child.geometry.computeVertexNormals(); // Normals opnieuw berekenen
            }
        });

        for (let i = 0; i < count; i++) {
            // Clone the original leaf
            const leaf = this.leafModel.clone()

            // Random start position (bijv. rondom een boom)
            leaf.position.set(
                origin.x + (Math.random() - 0.5) * 2,   // x ±1 rondom origin
                origin.y + Math.random() * 2 + 1,       // y tussen origin +1 en +3
                origin.z + (Math.random() - 0.5) * 2    // z ±1 rondom origin
            )

            // Random schaal & rotatie
            const scale = 0.25 + Math.random() * 0.1
            leaf.scale.set(scale, scale, scale)
            leaf.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)

            // Kies willekeurig een kleur uit de kleuren array
            const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];

            // Maak een nieuw materiaal met de willekeurige kleur
            const leafMaterial = new THREE.MeshStandardMaterial ({ 
                color: randomColor,
                roughness: 0.5, 
                metalness: 0.1
             });

            // Wijs het materiaal toe aan het blaadje
            leaf.material = leafMaterial;

            // Add to scene and internal array
            this.scene.add(leaf)
            this.leaves.push(leaf)

            // Simpele wind-achtige velocity (richting + zwaartekracht)
            this.velocities.push(new THREE.Vector3(
                (Math.random() - 0.5) * 0.005, // x wind
                -0.0035 - Math.random() * 0.001, // y gravity
                (Math.random() + 0.5) * 0.005  // z wind
            ))
        }
    }

    update() {
        this.leaves.forEach((leaf, i) => {
            const velocity = this.velocities[i]
            leaf.position.add(velocity)

            // optionele rotatie
            leaf.rotation.x += 0.01
            leaf.rotation.y += 0.01

            // Reset als hij te laag is
             if (leaf.position.y < 0) {
                leaf.position.set(
                    this.origin.x + (Math.random() - 0.5) * 2,
                    this.origin.y + Math.random() * 2 + 1,
                    this.origin.z + (Math.random() - 0.5) * 2
                )
            }
        })
    }
}
