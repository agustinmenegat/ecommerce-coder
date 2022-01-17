const fs = require('fs');
module.exports = class Products{
    constructor() {}
  
    funcionListar = (req, res) => {
        const data = fs.readFileSync('models/productos.txt', 'utf-8')
        const ide =JSON.parse(data);
        if (data.length==0) 
        {
            res.json({error:'No hay productos cargados'});
        } 
        else 
        {
            res.json(ide);
        }
    }

    funcionListarId= (req, res) => {
        let id = parseInt(req.params.id);
        let data = fs.readFileSync('models/productos.txt','utf-8')
        let ide =JSON.parse(data);
        const productobuscado = ide.find(e => e.id === id)
        if (productobuscado) 
        {
            res.json(productobuscado);
        } 
        else 
        {
            res.json({error:'Producto no encontrado'}); 
        }  
    }

    funcionGuardar = (req, res) => {
        if((fs.existsSync('models/productos.txt')) && ((fs.readFileSync('models/productos.txt','utf-8')).length != 0))
        {
            let {id, timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body
            let data = fs.readFileSync('models/productos.txt','utf-8')
            let ide =JSON.parse(data);
            id = ide.length+1;
            const newProducto = { 
                id: id,
                timestamp: timestamp,
                nombre: nombre,
                descripcion: descripcion,
                codigo: codigo,
                foto: foto,
                precio: precio,
                stock: stock
            }
            res.json({operacion:'Producto grabado', error:''});
            ide.push(newProducto)
            fs.writeFile('models/productos.txt', JSON.stringify(ide, null, '\t'), function(err) {
                if (err) throw err;
            });
        }
        else
        {
            let productoArray = [];
            fs.appendFile('models/productos.txt', JSON.stringify(productoArray, null, '\t'), function(err) {
                if (err) throw err;
            });
        }

    }

    funcionActualizar = (req, res) => {
        const id = Number(req.params.id);
        const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body
        const data = fs.readFileSync('models/productos.txt', 'utf-8')
        const ide =JSON.parse(data);
        const productobuscado = ide.find(e => e.id === id)
        if ( timestamp && nombre && descripcion && codigo && foto && precio && stock ) 
        {
            if (productobuscado)
            {
                productobuscado.timestamp = timestamp
                productobuscado.nombre  = nombre
                productobuscado.descripcion = descripcion
                productobuscado.codigo = codigo
                productobuscado.foto = foto
                productobuscado.precio = precio
                productobuscado.stock = stock
                fs.writeFile('models/productos.txt', JSON.stringify(ide, null, '\t'), function(err) {
                    if (err) throw err;
                });
                return res.json({
                    'message': 'Producto Actualizado',
                    'producto': productobuscado
                })
            } 
            else 
            {
                return res.json({'message': 'Producto no encontrado'})
            }
        } 
        else 
        {
            res.status(500).json({error: 'Hubo un error'});
        } 
    }

    funcionBorrar = (req, res) => {
        let id = parseInt(req.params.id);
        let data = fs.readFileSync('models/productos.txt','utf-8')
        let ide =JSON.parse(data);
        const productobuscado = ide.find(e => e.id === id)
        if (productobuscado) 
        {
            let indice = ide.indexOf(productobuscado);
            ide.splice(indice, 1);
            fs.writeFile('models/productos.txt', JSON.stringify(ide, null, '\t'), function(err) {
                if (err) throw err;
            });
            return res.json({
                'message': 'Producto Eliminado',
                'producto': productobuscado
            })
        } 
        else 
        {
            return res.json({'message': 'Producto no encontrado'})
        }  
    }
}