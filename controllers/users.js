const userServices = require('../services/users')
const userRegistrerMessage = require('../helpers/nodemailerMessages')

const register = async (req, res) => {
    try {
        const result = await userServices.addUser(req.body)

        if (result === 201) {
            userRegistrerMessage(req.body.firstName, req.body.email)
            res.status(201).json({ msg: 'Usuario registrado con exito' })
        } else if(result === 409){
            res.status(409).json({msg: "El rol por defecto es 'usuario'"})
        }else {
            res.status(401).json({ msg: `El email ${req.body.email} ya esta registrado` })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const profilePicture = async (req, res) => {
    try {
        const result = await userServices.addProfilePicture(req.userId, req.file)
        if(result === 200){
            res.status(200).json({msg: 'Imagen de perfil cargada correctamente'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const login = async (req, res) => {
    try {
        const result = await userServices.signIn(req.body)

        if(result.statusCode === 404){
            res.status(404).json(result.msg)
        } else if (result.statusCode === 400){
            res.status(400).json(result.msg)
        } else{
            res.status(200).json({
                token: result.token,
                msg: result.msg,
                role: result.role,
                userId: result.userId
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const changeState = async (req, res) => {
    try {
        const result = await userServices.activateOrDesactivate(req.params.userId)
        
        if (result === 404) {
            res.status(404).json({ msg: 'No encontramos al usuario en la base de datos' })
        } else {
            res.status(200).json(result.msg)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUsers = async (req, res) => {
    try {
        const result = await userServices.getAllUsers()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUser = async (req, res) => {
    try {
        const result = await userServices.getOneUser(req.params.userId)

        if(result === 404){
            res.status(404).json({ msg: 'No encontramos al usuario en la base de datos'})
        } else{
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const result = await userServices.userUpdate(req.userId, req.body)

        if(result === 404){
            res.status(404).json({ msg: 'Solo puedes actualizar el nombre y apellido'})
        } else {
            res.status(200).json({msg: 'Usuario actualizado con exito'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await userServices.userDelete(req.params.userId)

        if(result === 404){
            res.status(404).json({ msg: 'No encontramos al usuario en la base de datos'})
        }   else{
            res.status(200).json({msg: 'Usuario eliminado con exito'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    register,
    profilePicture,
    login,
    changeState,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}