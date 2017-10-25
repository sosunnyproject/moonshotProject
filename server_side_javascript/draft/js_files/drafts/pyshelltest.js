//var myPythonScriptPath = 'script.py';

// Use python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell('jsonvisual.py', {scriptPath: '/home/pirl/PycharmProjects/days/'});

// pyshell.on('message', function (message) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(message);
// });

var options = {
  mode: 'text',
  pythonPath: '/usr/local/bin/python3.4',
  pythonOptions: ['-u'],
  scriptPath: '/home/pirl/PycharmProjects/days',
  args: ['value1', 'value2', 'value3']

};

PythonShell.run('jsonvisual.py', options, function (err, results){
  if (err) throw err;
  console.log('working');
})
// end the input stream and allow the process to exit
// pyshell.end(function (err) {
//     if (err){
//         throw err;
//     };
//
//     console.log('finished');
// });
