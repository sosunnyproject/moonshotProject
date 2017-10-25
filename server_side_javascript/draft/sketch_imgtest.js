var img1, img2;  // Declare variable 'img'.

function setup() {
  createCanvas(1000, 1000);
  img1 = loadImage("phoenixcloud.png");  // Load the image
  img2 = loadImage("piegraph.png");  // Load the image
  
  
}

function draw() {}

function mousePressed() {
  img1.resize(400,400);
  img2.resize(400, 400);
  image(img1, 50, 50);
  image(img2, 50 + img1.width, 50);

}