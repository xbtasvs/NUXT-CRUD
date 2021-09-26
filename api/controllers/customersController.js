const Customer = require('../models/Customer');
const validator = require('express-validator');

// Get all
module.exports.list = function (req, res, next) {
  Customer.find({}, function(err, customers){
    if(err) {
        return res.status(500).json({
            message: 'Error getting records.'
        });
    }
    return res.json(customers);
  });
}


// Get one
module.exports.show = function(req, res) {
  var id = req.params.id;
  Customer.findOne({_id: id}, function(err, customer){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      if(!customer) {
          return res.status(404).json({
              message: 'No such record'
          });
      }
      return res.json(customer);
  });
}


// Create
module.exports.create = [
  // validations rules
  validator.body('title', 'Please enter Customer Title').isLength({ min: 1 }),
  validator.body('title').custom(value => {
    return Customer.findOne({title:value}).then(customer => {
      if (customer !== null) {
        return Promise.reject('Title already in use');
      }
    })
  }),
  validator.body('email', 'Please enter email').isLength({ min: 1 }),
  validator.body('password', 'Please enter password').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var customer = new Customer({
        full_name : req.body.full_name,
        email : req.body.email,
        password : req.body.password,
    })

    // save record
    customer.save(function(err, customer){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        return res.json({
            message: 'saved',
            _id: customer._id
        });
    })
  }
]

// Update
module.exports.update = [
  // validation rules
  validator.body('title', 'Please enter Customer Title').isLength({ min: 1 }),
  validator.body('title').custom( (value, {req}) => {
    return Customer.findOne({ title:value, _id:{ $ne: req.params.id } })
      .then( customer => {
      if (customer !== null) {
        return Promise.reject('Title already in use');
      }
    })
  }),
  validator.body('email', 'Please enter Author Name').isLength({ min: 1 }),
  validator.body('password', 'Please enter Customer Content').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;
    Customer.findOne({_id: id}, function(err, customer){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        if(!customer) {
            return res.status(404).json({
                message: 'No such record'
            });
        }

        // initialize record
        customer.full_name =  req.body.full_name ? req.body.full_name : customer.full_name;
        customer.email =  req.body.email ? req.body.email : customer.email;
        customer.password =  req.body.password ? req.body.password : customer.password;

        // save record
        customer.save(function(err, customer){
            if(err) {
                return res.status(500).json({
                    message: 'Error getting record.'
                });
            }
            if(!customer) {
                return res.status(404).json({
                    message: 'No such record'
                });
            }
            return res.json(customer);
        });
    });
  }

]


// Delete
module.exports.delete = function(req, res) {
  var id = req.params.id;
  Customer.findByIdAndRemove(id, function(err, customer){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      return res.json(customer);
  });
}
