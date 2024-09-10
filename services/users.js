const UserModel = require('../models/user')
const CartModel = require('../models/cart')
const FavModel = require('../models/favorite')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('../helpers/cloudinary')

const addUser = async (body) => {
    try {
        const userExist = await UserModel.findOne({ email: body.email })
        if (userExist) {
            return 401
        }

        if(body.role !== undefined){
            return 409
        }

        let salt = bcrypt.genSaltSync()
        body.password = bcrypt.hashSync(body.password, salt)
        const user = new UserModel(body)
        const userCart = new CartModel({userId: user._id})
        const userFav = new FavModel({userId: user._id})
        user.cartId = userCart._id
        user.favId = userFav._id

        await userCart.save()
        await userFav.save()
        await user.save()
        return 201
    } catch (error) {
        console.log(error)
    }
}

const addProfilePicture = async (userId, file) =>{
    try {
        const user = await UserModel.findOne({_id: userId})
        const result = await cloudinary.uploader.upload(file.path)
        user.profilePicture = result.secure_url
        await user.save()
        return 200
    } catch (error) {
        console.log(error)
    }
}

const signIn = async (body) => {
    try {
        const userExist = await UserModel.findOne({ email: body.email })

        if (!userExist) {
            return {
                statusCode: 404,
                msg: 'Usuarion no registrado'
            }
        }

        const isValidPassword = bcrypt.compareSync(body.password, userExist.password)

        if(!isValidPassword){
            return {
                statusCode: 400,
                msg: 'Contraseña incorrecta'
        }
    }

    const payload = {
        id: userExist._id,
        active: userExist.active,
        role: userExist.role
    }

    const token = jwt.sign(payload, process.env.JWT_KEY)
    return {
        statusCode: 200,
        token,
        msg: 'Usuario logueado correctamente',
        role: userExist.role,
        userId: userExist._id
    }

    } catch (error) {
        console.log(error)
    }
}

const activateOrDesactivate = async (id) => {
    try {
        const result = await UserModel.findOne({ _id: id })

        if (result === null) {
            return 404
        }

        result.active = !result.active
        await result.save()

        if (result.active) {
            return { msg: 'Usuario activado con exito' }
        } else {
            return { msg: 'Usuario desactivado con exito' }
        }
    } catch (error) {
        console.log(error)
    }
}

const getAllUsers = async () => {
    try {
        const result = await UserModel.find()
        return result
    } catch (error) {
        console.log(error)
    }
}

const getOneUser = async (id) => {
    try {
        const result = await UserModel.findOne({ _id: id })

        if (result === null) {
            return 404
        } else {
            return result
        }
    } catch (error) {
        console.log(error)
    }
}

const userUpdate = async (id, body) => {
    try {
        if (body.email !== undefined || body.password !== undefined || body.role !== undefined || body.active !== undefined || body.profilePicture !== undefined || body.cartId !== undefined || body.favId !== undefined) {
            return 404
        } else {
            await UserModel.findByIdAndUpdate({_id: id}, body)
            return 200
        }
    } catch (error) {
        console.log(error)
    }
}

const userDelete = async (id) => {
    try {
        const user = await UserModel.findOne({_id: id})
        const cartDelete = await CartModel.findByIdAndDelete(user.cartId)
        const favDelete = await FavModel.findByIdAndDelete(user.favId)
        const result = await UserModel.findByIdAndDelete(id)

        if (result === null) {
            return 404
        } else {
            return 200
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addUser,
    signIn,
    addProfilePicture,
    activateOrDesactivate,
    getAllUsers,
    getOneUser,
    userUpdate,
    userDelete
}