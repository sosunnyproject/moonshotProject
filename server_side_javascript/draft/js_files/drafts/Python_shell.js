
var python = require('python-shell');

var options = {
  mode : 'text',
  pythonPath: '',
  pythonOptions : ['-u'],
  scriptPath : '',
  //args : ['value1','value2','value3','value4']
};

PythonShell.run( 'jsonvisual.py',options, function(err,results){
  if (err) throw err;

  //console.log('results: %j', results);
});

// // const shell = new python('/home/pirl/PycharmProjects/days/jsonvisual.py');
//
// // let options = {pythonPath : '/usr/local/bin/python3.4'};
// //
// // python.defaultOptions = options;
//
// var PythonShell = require('python-shell');
// var pyshell = new PythonShell.run('jsonvisual.py', {scriptPath: '/home/pirl/PycharmProjects/days/'});
//
// // get message back
// pyshell.on('message', function (message) {
//   // received a message sent from the Python script (a simple "print" statement)
//   console.log(message);
// });
//
// // end the input stream and allow the process to exit
// pyshell.end(function (err) {
//   if (err) throw err;
//   console.log('exit');
// });
