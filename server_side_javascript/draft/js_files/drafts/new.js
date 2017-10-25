var PythonShell = require('python-shell');
var options = {

  mode: 'text',

  pythonPath: '/home/pirl/PycharmProjects/days',

  pythonOptions: ['-u'],

  scriptPath: '/home/pirl/js_files',

  args: ['value1', 'value2', 'value3']

};
PythonShell.run('script.py', options, function (err, results) {

  if (err) throw err;


  console.log('results: %j', results);

});
