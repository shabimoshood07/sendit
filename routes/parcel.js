const express = require('express')
const router = express.Router()
//const { isAdmin } = require('../middleware/authentication')

const {
    getAllParcelOrders,
    getParcelOrder, 
    createParcelOrder,
    updateParcelDestination,
    //updateParcelStatus,
    //updateParcelCurrentLocation,
    deleteParcelOrder
} = require('../controllers/parcelcontroller')  



router.route('/parcels').post(createParcelOrder).get(getAllParcelOrders)
router.route('/parcels/:id').get(getParcelOrder)
router.route('/parcels/:id/destination').put(updateParcelDestination)
//router.route('/parcels/:id/status',isAdmin).put(updateParcelStatus)
//router.route('/parcels/:id/currentLocation').put(updateParcelCurrentLocation)
router.route('/parcels/:id/delete').delete(deleteParcelOrder)

module.exports = router      