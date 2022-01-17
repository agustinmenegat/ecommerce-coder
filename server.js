const express = require('express');
const app = express();
const PORT = 8080;
const productsRoutes = require("./routes/products.js");
const cartRoutes = require("./routes/cart.js");

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use('/api/product', productsRoutes);
app.use('/api/cart', cartRoutes);

const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});

server.on('error', error=>console.log('Error en servidor', error));