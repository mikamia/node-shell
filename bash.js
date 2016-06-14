var Commands = require('./commands.js');

//process.stdout.write(`Current directory: ${'+process.cwd()}`);
process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim();
  var cmdList = cmdString.split(/\s*\|\s*/g); //cat command.js, head
  var args = cmdList[0].split(' '); //cat, command.js
  Commands[args[0]](cmdList.slice(1), args.slice(1), done); //stdin, file, done

});

var done = function(stdin, output){
   if(stdin[0] != undefined){

    var command = stdin[0].split(" ");
    if(command[0] === 'grep'){
      Commands[command[0]](stdin.slice(1), command[1], output, done);
    } else {
      Commands[stdin[0]](stdin.slice(1), output, done);
    }

   }
   else{
     process.stdout.write(output);
     process.stdout.write("\nprompt > ");
   }
};
