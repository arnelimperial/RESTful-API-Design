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

    server.get('/api/services/fee', async (req, res, next)=>{
        try{
            let param = req.query.testFee;
            var service = await Service.find({ testFee:param });
            if(service.length === 0){
                return next(new errors.ResourceNotFoundError(`There is no service with a fee of ${req.query.testFee}`));
            }
            res.send(service);
            next();

            
                
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no service with a fee of ${req.query.testFee}`));

        }
    });

    server.get('/api/services/test/:fieldOfTesting', async (req, res, next)=>{

        // try{
        //     //var param1=req.query.testName;
        
        //     var service = await Service.find({fieldOfTesting:req.query.fieldOfTesting});
        //     if(service === NULL){

        //         return next(new errors.ResourceNotFoundError(`There is no services in the field of ${req.query.fieldOfTesting}`));
        //     }else{
        //         res.send(service);
        //         console.log(service);

        //     }
        //     next();

        // }catch(err){
        //     return next(new errors.ResourceNotFoundError(`There is no services in the field of ${req.query.fieldOfTesting}`));
        // }
        try{
            var service = await Service.find({fieldOfTesting:req.params.fieldOfTesting});
            if(service.length === 0){
                return next(new errors.ResourceNotFoundError(`There is no service in the field ${req.params.fieldOfTesting}`));

            }else{
                res.send(service);
                next();
            }

        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no service in the ${req.params.fieldOfTesting}`));

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