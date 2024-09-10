const productServices = require('../services/products')

const createProduct = async (req, res) => {
    try {
        const result = await productServices.newProduct(req.body)
        if (result === 201) {
            res.status(201).json({ msg: 'Producto registrado con exito' })
        } else {
            res.status(400).json({ msg: 'El producto ya existe en la base de datos' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const changeCondition = async (req, res) => {
    try {
        const result = await productServices.productState(req.params.productId)
        res.status(200).json(result.msg)
    } catch (error) {
        res.status(500).json(error)
    }
}

const addImage = async (req, res) => {
    try {
        const result = await productServices.addImageToProduct(req.params.productId, req.file)

        if (result === 200) {
            res.status(200).json({ msg: 'Imagen agregada correctamente' })
        } else {
            res.status(404).json({ msg: 'No encontramos el producto en la base de datos' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteImage = async (req, res) => {
    try {
        const result = await productServices.deleteImageFromProduct(req.params.productId, req.params.imgId)

        if (result === 200) {
            res.status(200).json({ msg: 'Imagen eliminada correctamente' })
        } else if(result === 404) {
            res.status(404).json({ msg: 'No encontramos la imagen en producto' })
        } else{
            res.status(400).json({msg: 'No encontramos el producto en la base de datos'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const addToCart = async (req, res) =>{
    try {
        const result = await productServices.addProductToCart(req.userId, req.params.productId)

        if(result === 401){
            res.status(401).json({msg: 'El producto ya se encuentra en el carrito'})
        } else if(result === 404){
            res.status(404).json({msg: 'No encontramos el producto en la base de datos'})
        }   else{
            res.status(200).json({msg: 'Producto agregado correctamente al carrito'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteFromCart = async (req, res) =>{
    try {
        const result = await productServices.deleteProductFromCart(req.userId, req.params.productId)

        if(result === 404){
            res.status(404).json({msg: 'No encontramos el producto en el carrito'})
        }else{
            res.status(200).json({msg: 'Producto eliminado del carrito correctamente'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const addToFav = async (req, res) =>{
    try {
        const result = await productServices.addProductToFav(req.userId, req.params.productId)

        if(result === 401){
            res.status(401).json({msg: 'El producto ya se encuentra en favoritos'})
        } else if(result === 404){
            res.status(404).json({msg: 'No encontramos el producto en la base de datos'})
        }   else{
            res.status(200).json({msg: 'Producto agregado correctamente a favoritos'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteFromFav = async (req, res) =>{
    try {
        const result = await productServices.deleteProductFromFav(req.userId, req.params.productId)

        if(result === 404){
            res.status(404).json({msg: 'No encontramos el producto en favoritos'})
        }else{
            res.status(200).json({msg: 'Producto eliminado de favoritos correctamente'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await productServices.getAllProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await productServices.getOneProduct(req.params.productId)
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(400).json('Producto no encontrado')
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getProductsCart = async (req, res) =>{
    try {
        const response = await productServices.getProductsFromCart(req.userId)
        if(response.statusCode === 404){
            res.status(404).json({msg: 'No encontramos el carrito del usuario, contactarse con soporte'})
        } else{
            res.status(200).json({cart: response.cart})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getProductsFav = async (req, res) =>{
    try {
        const response = await productServices.getProductsFromFav(req.userId)
        if(response.statusCode === 404){
            res.status(404).json({msg: 'No encontramos los favoritos del usuario, contactarse con soporte'})
        } else{
            res.status(200).json({favorites: response.favorite})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateProduct = async (req, res) => {
    try {
        const result = await productServices.productUpdate(req.params.productId, req.body)
        res.status(200).json(result.msg)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const result = await productServices.productDelete(req.params.productId)
        if (result.statusCode === 200) {
            res.status(200).json(result.msg)
        } else {
            res.status(404).json(result.msg)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createProduct,
    changeCondition,
    addImage,
    deleteImage,
    addToCart,
    deleteFromCart,
    addToFav,
    deleteFromFav,
    getProducts,
    getProduct,
    getProductsCart,
    getProductsFav,
    updateProduct,
    deleteProduct
}