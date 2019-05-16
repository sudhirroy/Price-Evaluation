
const express = require('express'),
router = express.Router(),
controller = require('./../controller')

// Initial Route
  router.get('/', (req, res) => {
    return res.status(200).send('Welcome to Innoviarre')
  });

// Internal Routes  
router.get('/get_details', controller.component.get_details);
router.post('/add_details', controller.component.add_details);
router.post('/update_details', controller.component.update_details);
router.post('/calculate_price_details', controller.component.calculate_price_details);
module.exports = router;