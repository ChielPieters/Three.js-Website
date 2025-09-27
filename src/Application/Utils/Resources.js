import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter

{
    constructor(sources)
    {
        super()
        
        //Options
        this.sources = sources

        //Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        this.mixers = [];
        
        this.setLoaders()
        this.startLoading()
    }

    setLoaders(){
        this.loaders = {}
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('/draco/') 

        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)

        this.loaders.textureLoader = new THREE.TextureLoader()
    }

    startLoading()
    {
        //Load each source
        for(const source of this.sources)
        {
            if (source.type == 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>                   
                    {
                    this.sourceLoaded(source, file)
                    if (file.animations && file.animations.length > 0) 
                        {
                            //console.log(`[Resources] Animaties gevonden in ${source.name}:`, file.animations.map(a => a.name));
                        }

                    }
                )   
            }
            
            else if (source.type == 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>                   
                    {
                        this.sourceLoaded(source,file)
                    }
                )   
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file
        this.loaded++
        if(this.loaded == this.toLoad)
        {
            this.trigger('ready')
        }
    }
}