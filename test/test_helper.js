const mongoose = require('mongoose');

before((done)=>{

     mongoose.connect('mongodb://localhost:27017/uber_test');
     mongoose.connection
             .once('open',()=>{
             	done()
             })
             .on('error',(err)=>{
             	console.log('Warn',err);
             })

});


beforeEach((done)=>{
       /*When we drop the collection it drops the indexes as well*/
       const  {drivers}  = mongoose.connection.collections;
            drivers.drop()
                .then(()=>drivers.ensureIndex({'geometry.coordinates':'2dsphere'}))
                .then(()=> done())
                .catch(()=>done());

	})