'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(router, folder) {
  // read directory synchronously and recursively
  function readDirectory(dir, serverPath) {
    var cont = fs.readdirSync(dir);
    var files = [];
    if (err) throw err;
    for (var i = 0; i < cont.length; i++) {
      var stats = fs.statSync(path.join(dir, cont[i]));
      if (err) throw err;
      if (!cont[i].substr(0, 1) === '.') {
        if (!stats.isDirectory()) {
          files.push(serverPath + cont[i]);
        } else {
          var retFiles = readDirectory(path.join(dir, cont[i]), serverPath + cont[i] + '/');
          files = files.concat(retFiles);
        }
      }
    }
    return files;
  }

  var files = readDirectory(folder, '/');

  for (var i = 0; i < files.length; i++) {
    router.get(files[i], function(req, res) {
      fs.readFile(path.join(folder, files[i]), function(err, data) {
        if (err) throw err;

        res.end(data);
      });
    });
  }
}
