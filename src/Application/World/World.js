import * as TWEEN from '@tweenjs/tween.js'
import InputManager from '../Utils/InputManager.js';
import Application from '../Application.js';
import StartIsland from './startIsland.js';
import Environment from './Environment.js';



export default class World
{
    constructor(application)
    {
        this.application = new Application()
        this.scene = this.application.scene
        this.camera = this.application.camera
        this.resources = this.application.resources
        
        

        //Wait for resources
        this.resources.on('ready', () =>
        {
            this.startIsland = new StartIsland(this.application);
            this.environment = new Environment()
        })

        //InputManager
        this.tweenGroup = new TWEEN.Group();  // Dit maakt de tweenGroup aan
        this.inputManager = new InputManager(this.scene, this.application.camera.instance, this.tweenGroup);  // Geef het door aan InputManager
        
    }

    update(elapsedTime) {
        if (this.startIsland) {
            this.startIsland.update(elapsedTime)
        }
        
        this.tweenGroup.update()
    }
}