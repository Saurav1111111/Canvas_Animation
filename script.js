
 
document.addEventListener("DOMContentLoaded",()=>{
    console.log('hi');

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const particlesArray = [];
    let hue = 0;
    console.log(ctx);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    })
    
    let color = 'black';
    // ctx.fillStyle= 'blue';
    // ctx.beginPath();
    // ctx.arc(130,100, 50,0, Math.PI *2);
    // ctx.fill();
    // ctx.stroke();
    
    const mouse = {
        x: undefined , y: undefined
    };

    function drawCircle(){
        ctx.fillStyle= 'blue';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y , 15 , 0 ,Math.PI *2);
        ctx.fill();
    }

    canvas.addEventListener('click' , function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        // drawCircle();
        init();
    });
    canvas.addEventListener('mousemove' , function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        init();
        // drawCircle();
    });


class particle {
       
    constructor(){
        this.x  = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
//    this.y = Math.random() * canvas.height;
   this.size = Math.random()* 15 +1;
   this.speedX = Math.random()* 5-1.5;
   this.speedY= Math.random()* 5 -1.5;
   this.color = 'hsl( '+hue+', 100% ,50%)';

   
    }

    update(){
        // this.x += Math.random()* 3 -1.5;
        // this.y +=Math.random()* 3 -1.5;
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size>0.2) this.size -=0.1;

        
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.size, 0, Math.PI *2);
        ctx.fill();
    }


};
function init(){
    for(let i=0;i<2 ;i++){
        particlesArray.push(new particle());
    }
}

function handleParticles(){
    for(let i=0;i<particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for(let j=i; j< particlesArray.length; j++){
            let dx = particlesArray[i].x - particlesArray[j].x;
            let dy = particlesArray[i].y- particlesArray[j].y;
    
            const dis = Math.sqrt(dx*dx + dy*dy);
            
            
            if(dis<100){
                ctx.strokeStyle = particlesArray[i].color;
                ctx.beginPath();
                ctx.lineWidth = 0.5;
                ctx.moveTo(particlesArray[i].x , particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x , particlesArray[j].y);
                ctx.stroke();
            }
    
        }

        if(particlesArray[i].size <= 0.3){
        particlesArray.splice(i,1);
        i--;
    }
    
  

    }
    
}


init();
console.log(particlesArray);


// let t = 0.1;
    function animate(){
        // ctx.clearRect (0, 0, canvas.width, canvas.height); 
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0,0, canvas.width, canvas.height);
       handleParticles();
      
        requestAnimationFrame(animate);
        hue+=3;
    }
     animate();



    
    
   
});

