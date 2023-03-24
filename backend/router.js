import { Router } from 'express'
import { ProductsInstance } from './controllers/products.controller.js'
import { UsersInstance } from './controllers/users.controller.js'
import { saveOperation } from './middleware/addOperation.js'

export const handleRouter = new Router()

// handleRouter.get('/test', (req, res) => {console.log(req); res.status(200).json('success')})

handleRouter.get('/api/get-products', ProductsInstance.getProducts)
handleRouter.get('/api/get-product/:product', ProductsInstance.getProduct)
handleRouter.get('/api/get-operations', ProductsInstance.getOperations)
handleRouter.get('/api/get-users', UsersInstance.getUsers)

handleRouter.post('/api/order', UsersInstance.completeOrder, saveOperation)

