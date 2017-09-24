const DriverController = require('../controllers/drivers_controller');

module.exports = (app)=>{


 app.post('/api/drivers',DriverController.create)
 app.put('/api/drivers/:id',DriverController.edit)


}