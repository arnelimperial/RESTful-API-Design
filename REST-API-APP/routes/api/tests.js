var errors = require('restify-errors');
var rjwt = require('restify-jwt-community');
var Service = require('../../models/Services');
var config = require('../../config');

module.exports = server => {
    //GET Service listing

    
    server.get('/api/tests/:testFee', async (req, res, next)=>{
        try{
            var service = await Service.find({testFee:req.params.testFee});
            res.send(service);
        
            next();

        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no service with the id of ${req.params.testName}`));

        }
    });



};