// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var input, button, logoImg;
var inputVal = ''
var a = ''
var b = ''
var socket;
var final;
var id;
//var news_label=['중앙일보','한겨레','EBN Steel','NAVER','매일경제'];
//var news_value=['JA','HKR','EBN','NAVER','MK'];
var choice_news = [];

function preload() {
  logoImg = loadImage("logo.png");
}
function setup() {
  background(221, 183, 255);
  image(logoImg, windowWidth/12, 50);
  logoImg.resize(250, 250);
  wcloudImg = loadImage("pcloud.png");
  pieImg = loadImage("piegraph.png");
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3011');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('search',
    // When we receive data
    function(results) {
      console.log("Got: " + results.content + " " + results.id);
      // Draw a blue circle
    });

  render();
}

// socket.on('id_num', function(id){
//   console.log('sending' + id);
function render() {
  // create canvas
  background(221, 183, 255);
  createCanvas(windowWidth, windowHeight);
  header = createElement('h1', '경영 감정 분석');
  header.position(10, 5);

  summHeader = createElement('h2', '기사요약');
  collHeader = createElement('h2', '기사 모음');
  visHeader = createElement('h2', '시각화');

  input = createInput();
  input.position(10, header.y + 80);

  button = createButton('검색');
  button.position(input.x + 165, input.y);
  button.mousePressed(updateSearch);
  // button.mousePressed(drawAgain);
  //button.keyPressed();

  //start year dropdown
  start_year=createSelect();
  start_year.position(input.x,input.y+20);
  for (var s_year=1990 ; s_year < 2018 ; s_year++){
    start_year.option(s_year+'년',s_year);
  }

  //start month dropdown
  start_month=createSelect();
  start_month.position(input.x+50,input.y+20);
  for (var s_month=1 ; s_month < 13 ; s_month++){
    start_month.option(s_month+'월',s_month);
  }

  //end year dropdown
  end_year=createSelect();
  end_year.position(input.x+110,input.y+20);
  for (var e_year=1990 ; e_year < 2018 ; e_year++){
    end_year.option(e_year+'년',e_year);
  }
  //end month dropdown
  end_month=createSelect();
  end_month.position(input.x+160,input.y+20);
  for (var e_month=1 ; e_month < 13 ; e_month++){
    end_month.option(e_month+'월',e_month);
  }

  //news checkbox
  checkbox_a = createCheckbox("중앙일보");
  checkbox_b = createCheckbox("한겨레");
  checkbox_c = createCheckbox("EBN Steel");
  checkbox_d = createCheckbox("NAVER");
  checkbox_e = createCheckbox("매일경제");
  checkbox_a.position(input.x,input.y+40);
  checkbox_b.position(input.x,input.y+65);
  checkbox_c.position(input.x,input.y+90);
  checkbox_d.position(input.x,input.y+115);
  checkbox_e.position(input.x,input.y+140);

  drawAgain();
}

//press button to see your result.
//update all the options buttons
function updateSearch(){
  choice_news = []
  inputVal = input.value();
  input_start_year = start_year.value();
  input_start_month = start_month.value();
  input_end_year = end_year.value();
  input_end_month = end_month.value();
  appendnews();
  console.log(inputVal);
  console.log(input_start_year);
  console.log(input_start_month);
  console.log(input_end_year);
  console.log(input_end_month);
  console.log(choice_news);

  var keyword = inputVal;
  var s_year = input_start_year;
  var s_month = input_start_month;
  if (s_month < 10){
    var s_ym = s_year + "0" + s_month + "01"
  }
  else {
    var s_ym = s_year + s_month + "01"
  }
  var e_year = input_end_year;
  var e_month = input_end_month;
  if (e_month < 10){
    var e_ym = e_year + "0" + e_month + "31"
  }
  else {
    var e_ym = e_year + e_month + "31"
  }
  //["포스코",  "19900101","19900431", [ "NAVER","NAVER","MK"] ]

  final = [keyword, s_ym, e_ym, choice_news]
  id = 0
  console.log(final, id);
  
  sendResults(final, id);
  drawAgain();
  drawVis();
}

//called when Json is loaded
function gotData(data) {
  var s = [];
  var words = data;
  for (var i = 0; i < words.length; i++){
    each = data[i]['Title'];
    append(s, each);
  }
  drawText(s)
}

//called when gotData runs
function drawText(data) {
  var words = data
  for (var i = 1; i < 10; i++){
    var s = i + ". " + words[i-1];
    textSize(14);
    text(s, 10, windowHeight/2 + i * 30);
  }
}

function drawAgain(){
  background(221, 183, 255);
  image(logoImg, windowWidth/12, 50);
  logoImg.resize(250, 250);

}

function drawVis(){
  image(wcloudImg, windowWidth/2, 600);
  wcloudImg.resize(300, 300);
  image(pieImg, windowWidth/2 + wcloudImg.width, 500);
  pieImg.resize(520, 500);
}

function draw(){
  summHeader.position(windowWidth/2 +30, 30);
  collHeader.position(10, windowHeight/2 - 50);
  visHeader.position(windowWidth/2 +30, windowHeight/2 - 50);
  loadJSON("search.json", gotData, 'json');
}

function sendResults(final, id_num){
  console.log("sending: " + final + ", " + id_num);
  var results = {
    content: final,
    id : id_num
  };
  socket.emit('search', results);
}

function keyTyped(){
    if(key === '1'){
      id = 1;
      sendResults(final, id);
    }
    else if(key === '2'){
      id = 2;
      sendResults(final, id);
    }
    else if(key === '3'){
      id = 3;
      sendResults(final, id);
    }
    else if(key === '4'){
      id = 4;
      sendResults(final, id);
    }
    else if (key === '5'){
      id = 5;
      sendResults(final, id);
    }
    else if (key === '6'){
      id = 5;
      sendResults(final, id);
    }
    else if (key === '7'){
      id = 7;
      sendResults(final, id);
    }
    else if (key === '8'){
      id = 8;
      sendResults(final, id);
    }
    else if (key === '9'){
      id = 9;
      sendResults(final, id);
    }
    else{
      console.log("not ready");
    }
    loadStrings("raw.txt", summLoaded);
}

function summLoaded(data){
  console.log(data)
  textSize(15);
  text(data, windowWidth/2 + 100, 100, 500, 300);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawAgain();
  drawVis();
}
//checkbox function
function appendnews() {
  if (checkbox_a.checked()) {
    append(choice_news,'JA');
  }
  if (checkbox_b.checked()) {
    append(choice_news,'HKR');
  }
  if (checkbox_c.checked()) {
    append(choice_news,'EBN');
  }
  if (checkbox_d.checked()) {
    append(choice_news,'NAVER');
  }
  if (checkbox_e.checked()) {
    append(choice_news,'MK');
  }
}
