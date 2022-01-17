const routerProducts = require("express").Router();
const Products = require("../controllers/products");
let product = new Products();

routerProducts.get('/listar', product.funcionListar);
routerProducts.get('/listar/:id', product.funcionListarId);
routerProducts.post('/guardar', product.funcionGuardar);
routerProducts.put('/actualizar/:id', product.funcionActualizar);
routerProducts.delete('/borrar/:id', product.funcionBorrar);

module.exports = routerProducts ;