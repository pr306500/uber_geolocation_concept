const mongoose = require('mongoose');

before((done)=>{

     mongoose.connect('mongodb://localhost:27017/uber_test');
     mongoose.connection
             .once('open',()=>{
             	done()
             })
             .on('error',err=>{
             	console.log('Warn',error);
             })

});


beforeEach((done)=>{
       
       const  {drivers}  = mongoose.connection.collections;
         drivers.drop()
                .then(()=> done())
                .catch(()=>done())

	})