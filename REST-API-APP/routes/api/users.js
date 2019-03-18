var errors = require('restify-errors');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../../models/Users');
var auth = require('../../authentication');
const config = require('../../config');

module.exports = server => {
  // Register User
  server.post('/api/register', (req, res, next) => {
    var { email, password } = req.body;

    const user = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // Hash Password
        user.password = hash;
        // Save User
        try {
          const newUser = await user.save();
          res.send(201);
          next();
        } catch (err) {
          return next(new errors.InternalError(err.message));
        }
      });
    });
  });

  // Auth User
  server.post('/api/auth', async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // Authenticate User
      var user = await auth.authenticate(email, password);

      // Create JWT
      var token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '60m'
      });

      var { iat, exp } = jwt.decode(token);
      // Respond with token
      res.send({ iat, exp, token });

      next();
    } catch (err) {
      // User unauthorized
      return next(new errors.UnauthorizedError(err));
    }
  });
};