var fs = require('fs');
var request = require('request');

var Command = {
  'pwd' : function(stdin, file, done){
    var cwd = process.cwd();
    done(stdin, cwd);
  },
  'date' : function(stdin, file, done){
    done(stdin, 'Date: ' + Date());

  },
  'ls' : function(stdin, file, done){
    var output = "";
        fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        output += file.toString() + "\n";
      });
      done(stdin, output);
    });
  },
  'echo' : function(stdin, args,done){
    done(stdin, file, args.join(" "));
  },
  'cat' : function(stdin, file, done){
    fs.readFile("./"+file, function(err, data){
      if(err) {
        if(file.indexOf('\n') != -1){
          data = file;
        }else{
          throw err;
        }
      }
      done(stdin, data);
    });

  },
  'head' : function(stdin, file, done){
    fs.readFile('./'+file, function(err, data){
      var output = "";
      if(err) {
        if(file.indexOf('\n')){
          data = file;
        }else{
          throw err;
        }
      }
      var array = data.toString().split('\n');
      for(var i = 0; i < 5; i++){
        output += array[i]+'\n';
      }
      done(stdin, output);
    });
  },
  'tail' : function(stdin, file, done){
    var output = "";
    fs.readFile('./'+file, function(err, data){
      if(err) {
        if(file.indexOf('\n')){
          data = file;
        }else{
          throw err;
        }
      }
      var array = data.toString().split('\n');
      for(var i = 5; i >= 1; i--){
        output += array[array.length-i]+'\n';
      }
      done(stdin, output);
    });
  },
  'curl': function(stdin, url, done){
      request(url.toString(), function(error, response, body){
        if(!error && response.statusCode == 200){
          done(stdin, body);

        }
        else{
          throw error;
        }
    });
  },

  'grep' : function(stdin, matchString, output, done){
    var array = output.toString().split('\n');
    var outString = "";
    for(var i = 0; i < array.length; i++){
      if(array[i].indexOf(matchString) != -1){
        outString += array[i] + '\n';
      }
    }
    done(stdin, outString);
  }
};

module.exports = Command;
