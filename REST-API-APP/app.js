var restify = require('restify');
var mongoose = require('mongoose');
var config = require('./config');
var rjwt = require('restify-jwt-community');

var server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());
// Protect All Routes except /auth. To specified protected route insert the middleware:rjwt({ secret: config.JWT_SECRET })
 //server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));


server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(
      config.MONGODB_URI,
      { useNewUrlParser: true }
    );
  });
  
  

var db = mongoose.connection;

db.once('open', () => {
    //require('./routes/services')(server);
    //require('./routes/users')(server);
    //require('./routes/api')(server);
    require('./routes/api/services')(server);
    console.log(`Server started on port ${config.PORT}`);
  });
