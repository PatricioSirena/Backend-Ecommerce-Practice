const ProductModel = require('../models/product')
const UserModel = require('../models/user')
const CartModel = require('../models/cart')
const FavoriteModel = require('../models/favorite')
const cloudinary = require('../helpers/cloudinary')
const idGenerator = require('../helpers/idGenerator')

const newProduct = async (body) => {
    try {
        const productExist = await ProductModel.findOne({name: body.name})
        if(productExist === null){
            const product = new ProductModel(body)
            await product.save()
            return 201       
        } else{
            return 400
        } 
    } catch (error) {
        console.log(error)
    }
}

const productState = async (id) => {
    try {
        const product = await ProductModel.findById(id)

        product.active = !product.active
        await product.save()
        if(product.active){
            return {msg: 'producto activado con exito'}
        } else{
            return {msg: 'producto desactivado con exito'}
        }

    } catch (error) {
        console.log(error)
    }
}

const addImageToProduct = async (productId, file) => {
    try {
        const product = await ProductModel.findOne({ _id: productId })
        if(product !== null){
            const result = await cloudinary.uploader.upload(file.path)
            const imageId = idGenerator()
            const url = result.secure_url
            const mainPicture = false
            const image = { url, imageId, mainPicture }
            product.galery.push(image)
            await product.save()
            return 200
        }else{
            return 404
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteImageFromProduct = async (productId, imgId) =>{
    try {
        const product = await ProductModel.findOne({_id: productId})

        if(product){
            let index = product.galery.findIndex((img) => img.imageId === imgId)
            console.log(index)
            if(index === -1){
                return 404
            } else{
                product.galery.splice(index, 1)
                await product.save()
                return 200
            }
        }else{
            return 400
        }
        
    } catch (error) {
        console.log(error)
    }
}

const addProductToCart = async (userId, productId) =>{
    try {
        const user = await UserModel.findById(userId)
        const product = await ProductModel.findById(productId)
        const cart = await CartModel.findOne({_id: user.cartId})

        if(product !== null){
            const productExist = cart.products.find((item) => item._id.toString() === productId.toString())
            if(productExist){
                return 401
            } else{
                cart.products.push(product)
                await cart.save()
                return 200
            }
        } else{
            return 404
        }

    } catch (error) {
        console.log(error)
    }
}

const deleteProductFromCart = async (userId, productId) =>{
    try {
        const user = await UserModel.findById(userId)
        const cart = await CartModel.findOne({_id: user.cartId})

        const productExist = cart.products.findIndex((item) => item._id.toString() === productId.toString())

        if(productExist === -1){
            return 404
        }   else{
            cart.products.splice(productExist, 1)
            await cart.save()
            return 200
        }
    } catch (error) {
        console.log(error)
    }
}

const addProductToFav = async (userId, productId) =>{
    try {
        const user = await UserModel.findById(userId)
        const product = await ProductModel.findById(productId)
        const favorite = await FavoriteModel.findOne({_id: user.favId})

        if(product !== null){
            const productExist = favorite.products.find((item) => item._id.toString() === product._id.toString())
            if(productExist){
                return 401
            } else{
                favorite.products.push(product)
                await favorite.save()
                return 200
            }
        }else {
            return 404
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteProductFromFav = async (userId, productId) =>{
    try {
        const user = await UserModel.findById(userId)
        const favorite = await FavoriteModel.findOne({_id: user.favId})

        const productExist = favorite.products.findIndex((item) => item._id.toString() === productId.toString())

        if(productExist === -1){
            return 404
        }   else{
            favorite.products.splice(productExist, 1)
            await favorite.save()
            return 200
        }
        
    } catch (error) {
        console.log(error)
    }
}

const getAllProducts = async () => {
    try {
        const products = await ProductModel.find()
        return products
    } catch (error) {
        console.log(error)
    }
}

const getOneProduct = async (id) => {
    try {
        const product = await ProductModel.findById(id)
        return product
    } catch (error) {
        console.log(error)
    }
}

const getProductsFromCart = async (userId) =>{
    try {
        const user = await UserModel.findById(userId)
        const cart = await CartModel.findOne({_id: user.cartId})
        if(cart === null){
            return {statusCode: 404}
        } else{
            return {
                statusCode: 200,
                cart: cart.products}
        }
    } catch (error) {
        console.log(error);
    }
}

const getProductsFromFav = async (userId) =>{
    try {
        const user = await UserModel.findById(userId)
        const favorite = await FavoriteModel.findOne({_id: user.favId})
        if(favorite === null){
            return {statusCode: 404}
        } else{
            return {
                statusCode: 200,
                favorite: favorite.products}
        }
    } catch (error) {
        console.log(error);
    }
}

const productUpdate = async (id, body) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate({ _id: id }, body, { new: true })
        return {msg: 'Producto editado'}
    } catch (error) {
        console.log(error)
    }
}

const productDelete = async (id) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id })
        if (deletedProduct) {
            return {
                statusCode: 200,
                msg: 'Producto eliminado correctamente',
            }
        } else {
            return {
                statusCode: 404,
                msg: 'No encontramos el producto en la base de datos'
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    newProduct,
    productState,
    addImageToProduct,
    deleteImageFromProduct,
    addProductToCart,
    deleteProductFromCart,
    addProductToFav,
    deleteProductFromFav,
    getAllProducts,
    getOneProduct,
    getProductsFromCart,
    getProductsFromFav,
    productUpdate,
    productDelete
}