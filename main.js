
let random_number;


random_number = Math.floor(Math.random() * quick_draw_data_set.length);


console.log(quick_draw_data_set[random_number]);


let sketch = quick_draw_data_set[random_number];


document.getElementById('sketch-to-be-drawn').textContent = 'Sketch To be Drawn: ' + sketch;

let canvas;
let drawn_sketch = "";
let score = 0;
let timer_counter = 0;
let timer_check = "";


const quick_draw_data_set = ["cat", "dog", "tree", ];


function updateCanvas() {
  background(255); 
  const random_number = Math.floor(Math.random() * quick_draw_data_set.length);
  sketch = quick_draw_data_set[random_number];
  
  document.getElementById("sketch").textContent = sketch;
}


function setup() {
  
  canvas = createCanvas(280, 280);

  
  canvas.position(windowWidth / 2 - 140, windowHeight / 2 - 140);

 
  background(255);

 
  draw();

 
  check_sketch();
}


function draw() {
  
  if (drawn_sketch === sketch) {
    
    let answer_holder = "set";
    score++;
    
    
    document.getElementById("score").textContent = "Score: " + score;
  }
}


function check_sketch() {
  
  timer_counter++;

 
  document.getElementById("timer").textContent = "Timer: " + timer_counter;

  
  if (timer_counter > 400) {
    
    timer_counter = 0;
    timer_check = "completed";

  
    drawn_sketch = "";
    answer_holder = "";

   
    updateCanvas();
  }

  
  if (timer_check === "completed" || answer_holder === "set") {
    
    timer_check = "";
    answer_holder = "";

    
    updateCanvas();
  }
}

let classifier;
let labelP;
let confidenceP;
let previousX, previousY;
let strokeColor;
let strokeWidth;

function preload() {
  
  classifier = ml5.imageClassifier('DoodleNet', modelLoaded);
}

function setup() {
  canvas = createCanvas(400, 400);
  canvas.mouseReleased(classifyCanvas);

  labelP = select('#label');
  confidenceP = select('#confidence');

  strokeColor = 0;
  strokeWidth = 4; 

  background(255);
}

function draw() {
  stroke(strokeColor);
  strokeWeight(strokeWidth);

  if (mouseIsPressed) {
    line(previousX, previousY, mouseX, mouseY);
  }

  previousX = mouseX;
  previousY = mouseY;
}

function classifyCanvas() {
  canvas.loadPixels();
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    let label = results[0].label;
    let confidence = nf(results[0].confidence * 100, 2); 
    labelP.html('Your Sketch: ' + label);
    confidenceP.html('Confidence: ' + confidence + '%');
  }
}

function modelLoaded() {
  console.log('Model loaded!');
}

