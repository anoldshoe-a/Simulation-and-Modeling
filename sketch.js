let fluid;
let Dslider;
let Eslider;
let Vslider;
let Cslider;
let Aslider;
let jazzz;
let ciggy;
let back;
let ew;
let eh=1;
var angle = 0.0;

function preload() {
  jazzz = loadImage('assets/jazzz.png');
  ciggy = loadImage('assets/ciggy.png');
}

function setup() {
  createCanvas(N*SCALE, N*SCALE);
  //createCanvas(200, 200);
  frameRate(10);
  fluid = new Fluid(0.01, 0, 0, 0);
  Dslider = createSlider(0, 750,50,0);
  Dslider.position(10, height);
  Dslider.size(150);
  Eslider = createSlider(0,50,10);
  Eslider.position(10, height+25);
  Eslider.size(150);
  Vslider = createSlider(0,10,0.25,0);
  Vslider.position(10, height+50);
  Vslider.size(150);
  Aslider = createSlider(-0.4,0.4,0,0);
  Aslider.position(10, height+75);
  Aslider.size(150);
  Cslider = createSlider(0.0025,0.1,0.1,0);
  Cslider.position(10, height+100);
  Cslider.size(150);
  //fill(220);
  checkboxJ = createCheckbox(' jazz :0');
  checkboxJ.position(175, height);
}

function draw() {
  
let D = Dslider.value();
let E = Eslider.value();
let V = Vslider.value();
let A = Aslider.value();
let C = Cslider.value();
  
   if (checkboxJ.checked()) {
    image(jazzz,0,0,300,300)
    image(ciggy,20,150,175,175)
    Dslider.value(55);
    Eslider.value(2);
    Vslider.value(0.25);
    Cslider.value(0.015);
    var sinval = sin(angle);
    Aslider.value(map(sinval,-1,1,-0.075,0.075));
     eh=5;
  } else {
    back=background(0);
    eh=1;
  }
  

      angle += 0.1;
  let cx = int((0.5 * width) / SCALE);
  let cy = int( .8*height/ SCALE);
  for (let i = -E; i < E; i++) {
    for (let j = -eh; j <= eh; j++) {
      fluid.addDensity(cx + i, cy + j, D);
    }
  }

  for (let i = -E; i < E; i++) {
    for (let j = -5; j <= 5; j++) {
    //let angle = noise(t) * TWO_PI * 2;
   let v = p5.Vector.fromAngle(random(PI*(1.4+A),PI*(1.6+A)));
      //let v = p5.Vector.fromAngle(noise(0.005 * frameCount)+4.25);
      
    //let v = p5.Vector.fromAngle(PI*1.5+A);
 
    
    v.mult(V);
    t += 1;
    dtv = Cslider.value();
   fluid.addVelocity(cx + i, cy+j, v.x, v.y);
  }
  }

  fluid.step(C);
  fluid.RenderD();
}

