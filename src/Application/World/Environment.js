import * as THREE from 'three'

import Application from '../Application.js';

export default class Environment
{
    constructor()
    {
        this.application = new Application()
        this.scene = this.application.scene
        
    }

}