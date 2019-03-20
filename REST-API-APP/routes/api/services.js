var errors = require('restify-errors');
var rjwt = require('restify-jwt-community');
var Service = require('../../models/Services');
var config = require('../../config');

module.exports = server => {
    //GET Service listing

    
    server.get('/api/services', async(req, res, next)=>{
        try {
            var service = await Service.find({});
            res.send(service);
            next();
          } catch (err) {
            return next(new errors.InvalidContentError(err));
          }
    });

    //GET Services by ID
    server.get('/api/services/:id', async (req, res, next)=>{
        try{
            var service = await Service.findById(req.params.id);
            res.send(service);
            next();

        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no service with the id of ${req.params.id}`));

        }
    });

    server.get('/api/services/fees/:testFee', async (req, res, next)=>{
        try{
            var service = await Service.find({testFee:req.params.testFee});
            res.send(service);
        
            next();

        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no service with the id of ${req.params.testName}`));

        }
    });

    server.get('/api/services/tests/:testName', async (req, res, next)=>{
        try{
            var service = await Service.findOne({testName:req.params.testName});
            res.send(service);
        
            next();

        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no service with the id of ${req.params.testName}`));

        }
    });

    

    



    
   

    //Add Services
    server.post('/api/services', async(req, res, next)=>{
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        var {testName, testMethod, fieldOfTesting, sampleType, testFee} = req.body;
        var service = new Service({
            testName,
            testMethod,
            fieldOfTesting,
            sampleType,
            testFee
        });
        try{
            var newService = await service.save();
            res.send(201);
            console.log(newService);
            next();

        }catch(err){
            return next(new errors.InternalError(err.message));
        }


    });

    //Update Service
    server.put('/api/services/:id', async(req, res, next)=>{
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        
        try{
            var service = await Service.findOneAndUpdate({_id: req.params.id}, req.body);
            res.send(200);
            console.log(service);
            next();

        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no service with the id of ${req.params.id}`));
            
        }

    });

    //Delete Services
    server.del('/api/services/:id', async (req, res, next)=>{
        try{
            var service = await Service.findOneAndRemove({_id: req.params.id});
            res.send(204);
            next();

        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no service with the id of ${req.params.id}`));
        }

    });



};