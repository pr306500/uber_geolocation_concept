const Driver = require('../models/driver');
module.exports = {

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

  }


}