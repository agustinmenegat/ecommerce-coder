const fs = require('fs');
module.exports = class Carrito{
    
    constructor() {}
  
    funcionListarId= (req, res) => {
        let id = parseInt(req.params.id);
        let data = fs.readFileSync('models/carrito.txt','utf-8')
        let carro =JSON.parse(data);
        const carritobuscado = carro.find(e => e.idC === id)
        if (carritobuscado) {
            res.json(carritobuscado);
            
        } else {
            res.json({error:'Carrito no encontrado'}); 
        }
    }

    funcionGuardarId = (req, res) => {
        let idC = 1;
        const datas = fs.readFileSync('models/carrito.txt', 'utf-8')
        const idec =JSON.parse(datas);
        let carritobuscado = idec.find(e => e.idC === idC)
        let id = parseInt(req.params.id);
        const data = fs.readFileSync('models/productos.txt', 'utf-8')
        const ide =JSON.parse(data);
        let productobuscado = ide.find(e => e.id === id)
        console.log(productobuscado);

        res.json({operacion:'Producto grabado', error:''});
        carritobuscado.productos.push(productobuscado)

        fs.writeFile('models/carrito.txt', JSON.stringify(idec, null, '\t'), function(err) {
            if (err) throw err;
        });
    }

    funcionBorrar = (req, res) => {
        let idC = 1;
        const datas = fs.readFileSync('models/carrito.txt', 'utf-8')
        const idec =JSON.parse(datas);
        let carritobuscado = idec.find(e => e.idC === idC)

        let id = parseInt(req.params.id);
        let data = fs.readFileSync('models/productos.txt','utf-8')
        let ide =JSON.parse(data);
        const productobuscado = ide.find(e => e.id === id)

        if (productobuscado) {
            let indice = carritobuscado.productos.indexOf(productobuscado);
            carritobuscado.productos.splice(indice, 1);
            fs.writeFile('models/carrito.txt', JSON.stringify(idec, null, '\t'), function(err) {
                if (err) throw err;
            });
            return res.json({
                'message': 'Producto Eliminado',
                'producto': productobuscado
            })
        } else {
            return res.json({'message': 'Producto no encontrado'})
        }
    }
}