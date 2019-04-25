var errors = require('restify-errors');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../../models/Users');
var auth = require('../../authentication');
const config = require('../../config');

module.exports = server => {
  // Register User
  server.post('/api/register', async (req, res, next) => {
    var { email, password, name, job, company } = req.body;

    const user = new User({
      email,
      password,
      name,
      job,
      company
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
  //Delete Users
  server.del('/api/users/:id', async (req, res, next) =>{

    try{
      let users = await User.findOneAndDelete({_id: req.params.id});
      res.send(204);
      next();

  }catch(err){
      return next(new errors.ResourceNotFoundError(`There is no user with the id of ${req.params.id}`));
  }

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
