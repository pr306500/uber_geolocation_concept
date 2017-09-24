const Driver = require('../models/driver');
module.exports = {

  index:(req,res,next)=>{

    const {lng,lat} = req.query;// they string in nature not number
     
     Driver.geoNear(
                     {type:'Point',coordinates:[parseFloat(lng),parseFloat(lat)]},
                     {spherical:true, maxDistance:20000}
                   )
                    .then(drivers=>res.send(drivers))
                    .catch(next);

   },

  create:(req,res,next)=>{
    
    Driver.create(req.body)
          .then((driver)=>{
          	return res.send(driver);
          })
          .catch(next)

  },

  edit:(req,res,next)=>{
     /*It do not bring the updated record, it only brings the updated keys*/
     Driver.findByIdAndUpdate(req.params.id,req.body)
           .then(()=>Driver.findById(req.params.id))
           .then((driver)=>res.send(driver))
           .catch(next);

  },

  delete:(req,res,next)=>{

    Driver.findByIdAndRemove(req.params.id)
          .then(()=>findById(req.params.id))
          .then((driver)=>{
              
              if(driver === null){
                res.status(204).send('Driver deleted successfully')
              }

          })
          .catch(next);


  }

}