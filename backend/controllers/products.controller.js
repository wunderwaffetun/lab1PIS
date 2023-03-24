import { response } from "express";
import { db } from "../models/index.js";

class ProductsGeneral {
    async getProducts(req, res, next){
        db.product.findAll()
            .then((response, err) => {
                res.status(200).json({products: response})
            })
    }
    async getOperations(req, res, next){
        db.operations.findAll()
            .then((response, err) => {
                res.status(200).json({operations: response})
            })
    }
    async getProduct(req, res, next){
        db.product.findByPk(+req.params.product)
            .then(prod => {
                res.status(200).json({productName: prod.dataValues.name})
            })
            .catch(err => console.log(err, 'asdfasfsadfsafasdf'))
    }
}

export const ProductsInstance = new ProductsGeneral()