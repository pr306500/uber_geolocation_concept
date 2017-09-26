const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({

    'type':{
       type:String,
       default:'Point'
    },
    'coordinates':{
    	type:[Number],//(x,y)
    	index:'2dsphere'// We are creating indexing through schema.
    }

})

const DriverSchema = new Schema({
	
   "email":{

   	"type":String,
   	"required":true

   },

   "driving":{
      
      "type":Boolean,
      "default":false

   },
   "geometry":PointSchema


})


const Driver = mongoose.model('driver',DriverSchema);
module.exports = Driver;