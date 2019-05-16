var mongoose = require('mongoose');

// Setup schema
var priceDetailSchema = mongoose.Schema({
    component: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    component_info: [
        {
            size: {
                type: String,
                required: true
            },
            flap_side: {
                type: String,
                default: ''
            },
            sheet: {
                type: String,
                default: ''
            },
            pages: {
                type: String,
                default: ''
            },
            gusset: {
                type: String,
                default: ''
            },
            stocks_pricing: [],
            elements_pricing: []
        }
    ]
});

// Export Contact model
var Price_info = module.exports = mongoose.model('price_info', priceDetailSchema);
