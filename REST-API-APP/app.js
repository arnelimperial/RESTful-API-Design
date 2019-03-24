'use strict'
const restify = require('restify');
const mongoose = require('mongoose');
const Logger = require('morgan');
const config = require('./config');
const rjwt = require('restify-jwt-community');
const corsMiddleware = require('restify-cors-middleware');
//require('dotenv/config');
require('restify').plugins;

// var log = new Logger.createLogger({
//   name: 'REST-API-APP',
//   serializers: {
//       req: Logger.stdSerializers.req
//   }
// });



//CORS
const server = restify.createServer();
const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['http://localhost:8080', 'https://*.herokuapp.com'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['Authorization']

});
server.pre(cors.preflight);
server.use(cors.actual);





//console.log(process.env.MONGODB_URI);
//console.log(process.env.JWT_SECRET);
server.pre(function (request, response, next) {
  request.log.info({ req: request }, 'REQUEST');
  next();
});


// Middleware
//server.use(restify.acceptParser(server.acceptable));
server.use(Logger('dev'));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// Protect All Routes except /auth. To specified protected route insert the middleware:rjwt({ secret: config.JWT_SECRET })
 //server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));


server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(
      config.MONGODB_URI,
      { useNewUrlParser: true }
    );
  });

const db = mongoose.connection;

db.once('open', () => {
    //require('./routes/services')(server);
    //require('./routes/api/results')(server);
    require('./routes/api/users')(server);
    require('./routes/api/services')(server);
    console.log(`Server started on port ${config.PORT}`);
});


server.get('/api', restify.plugins.serveStaticFiles('./public/api'));
server.get('/', restify.plugins.serveStaticFiles('./public'));
