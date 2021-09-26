const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const customersController = require('../controllers/customersController')

// Get All
router.get('/customers', customersController.list)

// Get All
router.get('/customer/list', customersController.list)

// Get One
router.get('/customers/:id', customersController.show)

// Create
router.post('/customers', config.isAuthenticated, customersController.create)

// Update
router.put('/customers/:id', config.isAuthenticated, customersController.update)

// Delete
router.delete('/customers/:id', config.isAuthenticated, customersController.delete)

module.exports = router
