//you get module, which is function
var express = require('express');
var bodyParser = require('body-parser');
//to use express, gotta save in app and use it further
var app = express();

//template engine setup - jade
app.set('views', './views');
app.set('view engine', 'pug');

//static - stuff should be in public folder
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended: false}))

// //practice jade
// app.get('/template', function(req, res){
//   res.render('jade.pug');
// })

//practice form - form.jade
app.get('/form', function(req, res){
  res.render('jade');
});

//if you defined method as get in jade.pug
app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+', '+description)
});
//if you defined method as post in jade.pug
//how to print out description/title sent via post?
//use body-parser or multer
app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + ', ' + description);
});


//when user logs in website,
app.get('/', function(request, response) {
  //response
  response.send('Hello home page');
});
//get - router role
app.get('/login', function(req, res){
  res.send('Login please');
})

//non-semantic url type: always need topic/id=# or /name=#
app.get('/topic', function(req, res){
  var topics = [
    '포스코에 대한 검색결과',
    '삼성에 대한 검색결과',
    '제철에 대한 검색결과'
  ];
  var output =
  `<a href="/topic?id=0">포스코</a><br>
    <a href="/topic?id=1">삼성</a><br>
    <a href="/topic?id=2">제철</a><br><br>
    ${topics[req.query.id]}`
  res.send(output);
})
//this can be combined to below code topic & topic:id
// app.get('/topic', function(req, res){
//   fs.readdir('data', function(err, files){
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server error');
//     }
//     res.render('view', {topics:files});
//   });
// });

// app.listen(3000, function(err){
//   if(err){
//     console.log(err);
//   }
//   console.log('Connected, 3000 port');
// });

//semantic url : topic/id# topic/name
app.get('/topic/:id', function(req, res){
  var topics = [
    '포스코에 대한 검색결과',
    '삼성에 대한 검색결과',
    '제철에 대한 검색결과'
  ];
  var output =
  `<a href="/topic?name=포스코">포스코</a><br>
    <a href="/topic?name=삼성">삼성</a><br>
    <a href="/topic?name=제철">제철</a><br><br>
    ${topics[req.params.id]}`
  res.send(output);
})

app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+',' +req.params.mode);
});

//static practice
app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/route.png">');
});

app.get('/dynamic', function(req, res){
  var list = '';
  for(var i = 0;i<5;i++){
    list = list +'<li>coding</li>';
  }
  var time = Date();
  var output = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Document</title>
  </head>
  <body>
    <h1>Hello dynamic</h1>
    <ul>
    ${list}
    </ul>
  </body>
  </html>`
  ;
  res.send(output);
});


//you either access via get or host
//get  - type in url and access
app.get('/stock', function(req, res){
  res.send('<h1>this is stock visualization</h1>');
})


//app is listening to port 3000
app.listen(3001, function() {
  console.log('connected to 3001 port')
});
