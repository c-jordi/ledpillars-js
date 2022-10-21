class Strip {
    constructor(x,y,n,d,s,fps=60){
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext('2d')
        this.start = [x,y]
        this.n = n
        this.d = d
        this.s = s
        this.fps = fps
        this.fn = null
        this._last_update = new Date().getTime() // in ms

        this.track = this.track.bind(this)
        this.loop = this.loop.bind(this)
        this.drawPixel = this.drawPixel.bind(this)
        this.trigger = this.trigger.bind(this)
        this.show = this.show.bind(this)
    }

    show(fn){
        this.running = true
        this.fn = fn
        this.loop()
    }

    loop(fn){
        // Loops at a given framerate
        if (!this.running) return;
        let dt = 1/this.fps
        let drawPixel = this.drawPixel
        let track = this.track
        let out = this.fn(this.n)
        if (out == null){ // patern finished
            this.running = false
            this.clear()
            return;
        }
        let st = dt*1000 - (new Date().getTime())  + this._last_update; // sleep time
        setTimeout(()=>{    
            track()    
            out.slice(0,this.n).forEach((rgb,i) => {
                drawPixel(i, rgb)
            });
            window.requestAnimationFrame(this.loop);
        }, st)
    }

    clear(){
        new Array(this.n).fill(0).forEach((_,i)=>{this.drawPixel(i,[0,0,0])})
    }

    track(){
        this._last_update = new Date().getTime()
    }

    trigger(btn_id, fn){
        let show = this.show;
        document.getElementById(btn_id).addEventListener("click", ()=>show(fn))
    }

    drawPixel(i, rgb){
        if (rgb.length != 3){
            throw Error(`RGB should have 3 values: ${rgb}`)
        }
        if (Math.min(...rgb) < 0 || Math.max(...rgb) > 255){
            throw Error(`RGB values should be between 0 and 255`)
        }
        let d = this.d;
        let s = this.s;
        let x = this.start[0];
        let y = this.start[1] - (d+s) * i;
        this.ctx.fillStyle = `rgb(${rgb.join(",")})`;
        this.ctx.fillRect(x, y, d, d)
    }

}