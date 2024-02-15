var width;
var height;
var a = 1.89;

var dt = 0.01;
let array = [[]];
var numberOfLines = 10;
var scaleFactor = 13;
var maxPoints = 400;

const rotateSpeed = 0.01;
var currentAngle = 0;
class p{

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    scale(scale){
        return new p(this.x * scale, this.y * scale, this.z * scale);
    }
}

function setup(){
    width = window.innerWidth-10;
    height = window.innerHeight-10;
    createCanvas(width, height, WEBGL);

    // debugMode();
    frameRate(60);
    background(0);
    
    for(let number = 0; number < numberOfLines; number++){
        array.push([]);
    }
    for(let number = 0; number < numberOfLines; number++){
        var point = new p(-1.48 + number/numberOfLines,-1.51 + number/numberOfLines,2.04 + number/numberOfLines);
        array[number].push(point);
        
    }

    
    
    
}

function draw(){
    strokeWeight(0.5);
    orbitControl();

    currentAngle+=rotateSpeed;
    if(currentAngle>=360){
        currentAngle = 0;
    }
    rotateY(135*Math.PI/180);
    rotateX(45*Math.PI/180);
    // rotateY(currentAngle);
    // rotateX(currentAngle);
    // rotateZ(currentAngle);

    for(let number = 0; number < numberOfLines; number++){
        if(array[number].length >= maxPoints){
            array[number].shift();
        }
        var lastElementOfArray = array[number].length-1;
        var p = lorenz(array[number][lastElementOfArray]);
        array[number].push(p);
    }
    
    
    noFill();
    
    clear();
    
    const zAdjust = 0;
    for(let number = 0; number < numberOfLines; number++){
        
        beginShape();
        for(let i = 0; i < array[number].length; i++){
            var displayPoint = array[number][i].scale(scaleFactor);
            var color = i*255/array[number].length;
            stroke(color*3, color*0.9, color*0);
            vertex(displayPoint.x, displayPoint.y, displayPoint.z - zAdjust);
            
            if(i == array[number].length-1){
                // strokeWeight(7);
                stroke('pink');
                point(displayPoint.x, displayPoint.y, displayPoint.z-zAdjust);
            }

            strokeWeight(0.5);            
        }
        endShape(); 
    }
    
    //debug to find zAdjust
    // strokeWeight(2);
    // stroke('pink');
    // translate(0,0,-280); 
    // sphere(10);
    
}

function lorenz(point){
    var x = point.x;
    var y = point.y;
    var z = point.z;

    var dx = (-a*x - 4*y - 4*z - y**2)*dt;
    var dy = (-a*y - 4*z - 4*x - z**2)*dt;
    var dz = (-a*z - 4*x - 4*y - x**2)*dt;

    return new p(x+dx, y+dy, z+dz);
}
