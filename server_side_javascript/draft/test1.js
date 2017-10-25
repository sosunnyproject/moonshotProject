var express = require('express');
var app = express();  //web framework module
var fs = require('fs'); //file system - file read, write
/////////////////////////////////////////////////////////////////

const http = require('http');
const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
/////////////////////////////////////////////////////////////////

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
///////////////////////////////////////////////////////////////////////////
      fs.writeFileSync('search.json', JSON.stringify(rows), 'utf8');
      // function(err){
      //   if (err) throw err;
      //   console.log('Saved!');
      //});
///////////////////////////////////////////////////////////////////////////
      //res.write(rows);
    }
});

//////////////////////////////////////////////////////////////////////////
//online connection - localhost:3001
app.listen(3001);
app.get("/", function(req, res){
  var filepath = require('/opt/server_side_javascript/search.json')
  res.json(filepath);
});

connection.end();
