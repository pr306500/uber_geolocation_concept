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
      /* Manually we are adding driver to the database */
      const driver = new Driver({'email':'john@gmail.com','driving':false})

            driver.save()
                  .then(()=>{
      /*After manually saving it, we try to update it*/
              request(app) // here we are hitting to the mock server
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

  it('Delete to /api/drivers/id delete a driver',(done)=>{

       const driver = new Driver({'email':'john@gmail.com'});

             driver.save()
                   .then(()=>{
                    
                    request(app)//mock server has been created.
                        .delete('/api/drivers/'+driver._id)
                        .end(()=>{
                            Driver.findOne({_id:driver._id})
                                  .then((driver)=>{
                                    assert (driver === null)
                                    done();
                                  })
                                  
                        })

                 })

          })

 it('Get to /api/drivers find drivers in a location',(done)=>{
    /* While performing unit test cases we need to enter data manually one*/
       const seattleDriver = new Driver({
                 'email':'john@gmail.com',
                 'geometry':{'type':'Point','coordinates':[-122.4759902,47.6147628]}
               });
       
       const miamiDriver = new Driver({
                 'email':'phonny@gmail.com',
                 'geometry':{'type':'Point','coordinates':[-80.253,25.791581]}
               });

               Promise.all([seattleDriver.save(),miamiDriver.save()])
                      .then(()=>{

                        request(app)
                          .get('/api/drivers?lng=-80&lat=25')
                          .end((err,res)=>{
                            
                              done()
                          })

                 })

          })


  })