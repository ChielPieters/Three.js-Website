import * as THREE from 'three'
import EventEmitter from './EventEmitter.js';

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        //Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 0
        this.clock = new THREE.Clock()
       

        window.requestAnimationFrame(() =>
            {
                this.tick()
            })

    }


    tick()
    {
        const elapsedTime = this.clock.getElapsedTime()
        const currentTime = Date.now()
        this.delta = (currentTime - this.current) / 1000; //Tijd in seconden
        this.current = currentTime
        this.elapsed = this.current - this.start
    
        this.trigger('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick()
        
        })
    }
}