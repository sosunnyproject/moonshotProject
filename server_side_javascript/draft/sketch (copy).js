/*
 * @name Input and Button
 * @description You will need to include the
 * <a href="http://p5js.org/reference/#/libraries/p5.dom">p5.dom library</a>
 * for this example to work in your own project.<br><br>
 * Input text and click the button to see it affect the the canvas.
 */
var input, button, logoImg;
var inputVal = ''
var a = ''
var b = ''
var socket;

//var news_label=['중앙일보','한겨레','EBN Steel','NAVER','매일경제'];
//var news_value=['JA','HKR','EBN','NAVER','MK'];
var choice_news = [];

function preload() {
  logoImg = loadImage("logo.png");
}

function setup() {
  background(221, 183, 255);
  frameRate(100);
  socket = io.connect('http://localhost:3000');
  socket.on('search', function(final){
    console.log("sending "+ final.options + ", "+ final.id);
  });
  // create canvas
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
  button.mousePressed(clearCanvas);
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
  checkbox_a.changed(appendnews_a);
  checkbox_b.changed(appendnews_b);
  checkbox_c.changed(appendnews_c);
  checkbox_d.changed(appendnews_d);
  checkbox_e.changed(appendnews_e);
  checkbox_a.position(input.x,input.y+40);
  checkbox_b.position(input.x,input.y+65);
  checkbox_c.position(input.x,input.y+90);
  checkbox_d.position(input.x,input.y+115);
  checkbox_e.position(input.x,input.y+140);
  /*MK
  for (var i=0; i<5; i++){
    news_label[i]=createCheckbox(news_label[i],news_value[i]);
    news_label[i].position(input.x,input.y+40+30*i);
  }
  */
  logoImg.resize(100, 100);
  drawAgain();
}

function clearCanvas(){
  clear();
  drawAgain();
  console.log("clear");
}

//press button to see your result.
//update all the options buttons
function updateSearch(){
  inputVal = input.value();
  input_start_year = start_year.value();
  input_start_month = start_month.value();
  input_end_year = end_year.value();
  input_end_month = end_month.value();

  console.log(inputVal);
  console.log(input_start_year);
  console.log(input_start_month);
  console.log(input_end_year);
  console.log(input_end_month);
  console.log(choice_news);
  
  var keyword = inputVal;
  var s_year = input_start_year;
  var s_month = input_start_month;
  var e_year = input_end_year;
  var e_month = input_end_month;
  
  var options = [keyword, s_year, s_month, e_year, e_month, choice_news]
  var final = {
    content: options,
    id: id
  }
  socket.emit('search', final);
  loadJSON("search.json", gotData, 'json');

}

function drawAgain(){
  background(221, 183, 255);
  image(logoImg, header.x + 200, header.y);
  console.log("called");
}

function draw(){
  summHeader.position(windowWidth/2 +30, 30);
  collHeader.position(10, windowHeight/2 +30);
  visHeader.position(windowWidth/2 +30, windowHeight/2 +30);

}

//called when Json is loaded
function gotData(data) {
  var s = [];
  var words = data;
  for (var i = 0; i < words.length; i++){
    var count = words.length;
    each = data[i]['Title'];
    append(s, each)
  }
  drawText(s)
}

//called when gotData runs
function drawText(data) {
  var words = data

  for (var i = 0; i < words.length; i++){
    button = createButton(words[i]);
    button.position(10, 500 + i*30)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawAgain();
  drawText(options);
}
//checkbox function
function appendnews_a() {
  if (checkbox_a.checked()) {
    append(choice_news,'JA');
  }
}
function appendnews_b() {
  if (checkbox_b.checked()) {
    append(choice_news,'HKR');
  }
}
function appendnews_c() {
  if (checkbox_c.checked()) {
    append(choice_news,'EBN');
  }
}
function appendnews_d() {
  if (checkbox_d.checked()) {
    append(choice_news,'NAVER');
  }
}
function appendnews_e() {
  if (checkbox_e.checked()) {
    append(choice_news,'MK');
  }
}

// clear();
//   background(221, 183, 255);
//   image(logoImg, header.x + 200, header.y);

  /*
  //input_choice_news = []
  for (var i=0; i<5; i++){
    if (news[i].checked()) {
      append(input_choice_news,"a");
    }
  }
  */
  
    // for (var i = 0; i < words.length; i++){
  //   var count = words.length;
  //   each = data[i]['Title'];
  //   textSize(25);
  //   text(each, 400, 600+i*25, 800, 300);
  // }

  // textSize(25);
  // text(s[1], 800, 650, 800, 400);
  
    //Show search keyword
  // fill(255,255,255);
  // //bottom-right
  // fill(193, 160, 200);
  // rect(windowWidth/2, windowHeight/2, 1000, 1000);

  // //botoom-left
  // fill(193, 160, 220);
  // rect(0, windowHeight/2, windowWidth/2, windowHeight/2);

  // //top-right
  // fill(193, 160, 255);
  // rect(windowWidth/2, 0, windowWidth, windowHeight/2);
 