var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get user by email
      const user = await User.findOne({ email });

      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch){
          resolve(user);
        }else{
          reject('Authentication Failed!');
        }
      
      });
    
    }catch(err){
      reject('Authentication Failed!');
    }
  });

}