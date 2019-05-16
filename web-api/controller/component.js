var model = require('./../models');
module.exports = {
    get_details: (req, res, next) => {
        var component = model.price_info.find({});
        component.then(com => {
        res.status(200).send(com);
        });
    },
    add_details: (req, res, next) => {
        var component = req.body.component;
        var size = req.body.size;
        var flap_side = req.body.flap_side;
        var sheet = req.body.sheet;
        var pages = req.body.pages;
        var gusset = req.body.gusset;
        var stocks_pricing = req.body.stocks_pricing;
        var elements_pricing = req.body.elements_pricing;
        if (component == 'Select' || size == 'Select') {
        return res.status(400).send('Please Select Component and Size');
        }
    
        var component_info = model.price_info.findOne({component: component});
        
        component_info.then(component_info_data => {
        if (component_info_data) {
            var existing_size = component_info_data.component_info.findIndex(size_info => size_info.size == size);
            if (existing_size > -1) {
            stocks_pricing.forEach(stock => {
                component_info_data.component_info[existing_size].stocks_pricing.push(stock);
            });
            elements_pricing.forEach(element => {
                component_info_data.component_info[existing_size].elements_pricing.push(element);
            });
            } else {
            component_info_data.component_info.push({
                size: req.body.size,
                flap_side: req.body.flap_side,
                sheet: req.body.sheet,
                pages: req.body.pages,
                gusset: req.body.gusset,
                stocks_pricing: req.body.stocks_pricing,
                elements_pricing: req.body.elements_pricing
            })
            }
            component_info_data.save(function(err, saved) {
            if (err) {
                console.log('err', err);
            } else {
                console.log('succ', saved);
            }
            res.status(200).send('done');
            });
        }
        
        else {
    
            var new_price_info = new model.price_info({
            component: component,
            component_info: [{
                size: req.body.size,
                flap_side: req.body.flap_side,
                sheet: req.body.sheet,
                pages: req.body.pages,
                gusset: req.body.gusset,
                stocks_pricing: req.body.stocks_pricing,
                elements_pricing: req.body.elements_pricing
            }]
            });
            new_price_info.save(function(err, saved) {
            if (err) {
                console.log('err', err);
            } else {
                console.log('succ', saved);
            }
            res.status(200).send('done');
            })
        }
        })
        .catch(err => {
        console.log('err', err);
        })
      },
    update_details: (req, res, next) => {
        var component_info = req.body;
        
        model.price_info.findOneAndUpdate({ "_id": component_info.component_id,"component_info._id": component_info.price_info_id },{'$set': {
        'description': component_info.description,
        'component_info.$.stocks_pricing': component_info.stocks_pricing,
        'component_info.$.elements_pricing': component_info.elements_pricing
        }},{ "new": true})
        .exec()
        .then(data=> {
            res.status(200).send();
        }
        )
        .catch(err=> {
            console.log(err);
            res.status(400, err);
        })
    },
    calculate_price_details: (req, res, next) => {
        let selected_condition = req.body;
        if (selected_condition.component && selected_condition.component.trim()) {
            let component = model.price_info.findOne({'component': selected_condition.component});
            component.then(component_info_detail => { 
              return res.status(200).send(component_info_detail); 
            })
         } else {
          res.status(500).send('Select Component First');
        }
    }      
}
  