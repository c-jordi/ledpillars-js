// Patterns
// - Functions that take as input the number of leds

const allWhite = (n) => {
    return new Array(n).fill([255,255,255])
}

const redGradient = (n) => {
    return new Array(n).fill(0).map((v,i)=>[255-i,0,0])
}

const random = (n) => {
    return new Array(n).fill(0).map(()=>{
        return [Math.floor(Math.random()*255),0,0]
    })
}

// Pattern Generators

const fazzer = (d) => {
    // d duration in s, n nleds
    // up 0.4, hold 0.3, remove 0.3
    let start_time = null;
    let reset = 0;
    const time = () => new Date().getTime()
    const progress = () => ((time()-start_time)/1000/d)
    
    return (n) => {
        let red = new Array(n).fill(0).map(()=>[255,0,0]);
        if (reset ==0 ){
            start_time = time()
            reset++
        }
        let p = progress() 
        if (p<0.4){ // up
            return new Array(n).fill(0).map((v,i)=> {
                // imagine a line of length n folding in on the strip
                let ang = Math.PI/2*(1-p/0.4) // angle
                if (n*Math.cos(ang) < i) return [0,0,0]
                let dist = i * Math.tan(ang)
                let c = Math.floor(255*(1-dist/n))
                return [c,0,0]
            })
        } 
        if (p < 0.7) return red
        reset = 0
        return null
    }
}


