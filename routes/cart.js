const routerCart = require("express").Router();
const Carrito = require("../controllers/cart");
let cart = new Carrito();

routerCart.get('/listar/:id', cart.funcionListarId);
routerCart.post('/guardar/:id', cart.funcionGuardarId);
routerCart.delete('/borrar/:id', cart.funcionBorrar);

module.exports = routerCart;