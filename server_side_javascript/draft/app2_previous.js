var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs'); //filesystem module

app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('sketch'));

app.set('views', './views_file');
app.set('view engine', 'pug');

//GET
app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err, files){
    if (err){
      console.log(err);
    }
    res.render('new', {topics:files});
  });
});

app.get(['/topic', '/topic/:id'], function(req, res){
  var id = req.params.id;
  fs.readdir('data', function(err, files){
    if (err){
      console.log(err);
    }
    if(id) {
    //id 있을 떄
    fs.readFile('data/'+id, 'utf8', function(err, data){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.render('view',{topics:files, title:id, description:data});
    })
    } //id 값 있을 때
    else{
      res.render('view', {topics:files, title:'Welcome', description:'no id storyed eyt'})
    }
  })
});
// POST
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  //save POST input data into a file
  fs.writeFile('data/'+title, title, function(err){
      if(err){
          console.log(err);
          res.status(500).send('Internal Server error');
      }
      res.redirect('/topic/'+title);
  });
});

// WebSocket Portion
// WebSockets work with the HTTP server
var server = app.listen(3001);

var socket = require('socket.io');
var io = socket(server);

var query = []
//var sql1 = "select" + keyword + "~~"
//var sql2 =
//var sql3 =

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',newConnection);
function newConnection(socket){
  console.log('new connection: ' + socket.id);
  socket.on('search', newSearch);
  function newSearch(final){
    query.push(final)
    //keyword = query[0]
    //start_date = query[1]
    //end_date = query[2]
    //news = query[3]

    // io.sockets.emit('new query', data)
    // db.query('INSERT INTO notes (note) VALUES', data.note)
    // socket.broadcast.emit('search', data);
    // io.sockets.emit('search', data);
    console.log(query[0]);
    console.log(Array.isArray(query[0]));
    console.log(query[0][0]);
    console.log(query[0][1]);
  }
}



//DB Portion
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : '141.223.122.63',
    user     : 'PakrSS',
    password : '242242',
    database : 'TEST'
  });

  connection.connect();
  console.log('mysql접속 성공');

// after connecting to P5
// var keyword = io.sockets.emit('new query', data)
//  var sql = 'select' + keyword + 'from EBN ';
  var sql = 'select' + '*' + 'from EBN ';

  //res.end('Hello World\n');
  connection.query(sql,function(err,rows,fields){
    if(err){
      console.log(err);
    }
    else{
      //console.log(rows);
      fs.writeFileSync('search.json', JSON.stringify(rows), 'utf8');
    }
});
