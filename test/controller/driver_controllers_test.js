const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers Controller',()=>{
  
  it('posts to /api/drivers to create a new driver',(done)=>{

   Driver.count()
         .then((count) => {

          request(app)
  	      .post('/api/drivers')
  	      .send({email:'nkak306500@gmail.com'})
  	      .end(()=>{
  	      	Driver.count()
  	      	      .then((_count)=>{
  	      		assert(_count === count+1);
  	      		done();
  	      	})
  	      })
      
      });

  });

  it('PUT to /api/drivers/id exits an existing driver',(done)=>{

      const driver = new Driver({'email':'john@gmail.com','driving':false})

            driver.save()
                  .then(()=>{

              request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({'driving':true})
                .end(()=>{
                  
                  Driver.findOne(driver._id)
                        .then((_driver)=>{
                          assert(_driver.driving === true);
                          done();
                        })
                })

                  })


  })


})