var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
var fs = require('fs'); //filesystem module

//
// app.locals.pretty = true;
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(express.static('sketch'));
//
// app.set('views', './views_file');
// app.set('view engine', 'pug');
//
// //GET
// app.get('/topic/new', function(req, res){
//   fs.readdir('data', function(err, files){
//     if (err){
//       console.log(err);
//     }
//     res.render('new', {topics:files});
//   });
// });
//
// app.get(['/topic', '/topic/:id'], function(req, res){
//   var id = req.params.id;
//   fs.readdir('data', function(err, files){
//     if (err){
//       console.log(err);
//     }
//     if(id) {
//     //id 있을 떄
//     fs.readFile('data/'+id, 'utf8', function(err, data){
//       if(err){
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//       }
//       res.render('view',{topics:files, title:id, description:data});
//     })
//     } //id 값 있을 때
//     else{
//       res.render('view', {topics:files, title:'Welcome', description:'no id storyed eyt'})
//     }
//   })
// });
// // POST
// app.post('/topic', function(req, res){
//   var title = req.body.title;
//   var description = req.body.description;
//   //save POST input data into a file
//   fs.writeFile('data/'+title, title, function(err){
//       if(err){
//           console.log(err);
//           res.status(500).send('Internal Server error');
//       }
//       res.redirect('/topic/'+title);
//   });
// });

console.log('error?')
// WebSocket Portion
// WebSockets work with the HTTP server
var server = app.listen(3011);
var socket = require('socket.io');
var io = socket(server);
/////////////////////////////////////////////////////////////

//DB Portion
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '141.223.122.63',
  user     : 'KimTY',
  password : '242242',
  database : 'TEST'
});

connection.connect();
console.log('mysql접속 성공');

//////////////////////////////////////////////////////

var query; //an input list will be stored
// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', function(socket){
  console.log('new connection: ' + socket.id);
  /////////////////////////////////////////////////////////
  socket.on('search', function (results){
    query = results.content;
    ind = results.id
    //console.log(Array.isArray(query[3]));
    //console.log(query[0] + "," + query[1] + "," +query[2]+query[3])
    //query[0] : keyword, [1]:start_date [2]:end_date [3]:choice_news
    console.log("content: " + query + ", id: " + ind);
    var sql = ""
    if (query[3].length > 1){
      for(var i =0; i < query[3].length; i++){
        a = query[3][i]
        if(i === 0){
          sql +=  "(select * FROM "+ a +" WHERE `DATE` BETWEEN'"+query[1]+ "'AND'" + query[2] + "'AND Title LIKE'%"+query[0]+"%' Limit 10)"
        }
        else{
          sql +=  "UNION ALL (select * FROM "+ a +" WHERE `DATE` BETWEEN'"+query[1]+ "'AND'" + query[2] + "'AND Title LIKE'%"+query[0]+"%' Limit 10)"
        }
      }
    }
    else{
      sql = "(select * FROM "+query[3][0]+" WHERE `DATE` BETWEEN'"+query[1]+ "'AND'" + query[2] + "'AND Title LIKE'%"+query[0]+"%' Limit 10)"
    }

    //res.end('Hello World\n');
    connection.query(sql,function(err,rows,fields){
      if(err){
        console.log(err);
      }
      else{
        //console.log(rows.length;)
        lst = rows;
        size = lst.length;
        for (i = 0;i <lst.length;i++){
          lst[i]['id'] = i+1
        }
        console.log("writing");
        fs.writeFile('search.json', JSON.stringify(lst), 'utf8');
      }
    });
      //connection.end();
    if(ind != 0){
      var jsonfile = require('/home/pirl/js_files/sketch/search.json')
      fs.writeFile('raw.txt', jsonfile[ind].Main, 'utf8');
      console.log(ind);

    }


    /////////execute python shell ////////////////////
  })
});

// after connecting to P5
// var keyword = io.sockets.emit('new query', data)
//  var sql = 'select' + keyword + 'from EBN ';

//online connection - localhost:3001
// app.listen(3001);
// app.get("/", function(req, res){
//   var filepath = require('/opt/server_side_javascript/search.json')
//   res.json(filepath);
// });
