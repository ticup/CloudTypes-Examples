/**
 * Created by ticup on 01/11/13.
 */
var file = new (require('node-static').Server)('./node_modules/cloudtypes/');
var port = process.env.PORT || 3000;

/* setup static file server */
var http = require('http').createServer(function (req, res) {
  console.log("SERVING: " + req);
  req.addListener('end', function () {
    file.serve(req, res);
  }).resume();
}).listen(port);


/* setup grocery example */
var grocery = require('./node_modules/cloudtypes/examples/grocery/server/grocery.js');
console.log(grocery);
// hackedyhack for Heroku
grocery.server.io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

grocery.publish(http);

console.log("#### CloudTypes Examples server running on " + port + " ####");