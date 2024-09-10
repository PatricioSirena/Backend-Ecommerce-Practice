const express = require('express')
const router = express.Router()
const { register, changeState, getUsers, getUser, updateUser, deleteUser, login, profilePicture } = require('../controllers/users')
const {check} = require('express-validator')
const auth = require('../middleware/auth')
const validateFields = require('../middleware/validateFields')
const multer = require('../middleware/multer')

router.post('/', [
    check('firstName', 'El nombre es requerido').not().isEmpty(),
    check('firstName', 'El nombre debe tener entre 2 y 40 caracteres').isLength({min: 2, max: 40}),
    check('lastName', 'El apellido es requerido').not().isEmpty(),
    check('lastName', 'El apellido debe tener entre 2 y 40 caracteres').isLength({min: 2, max: 40}),
    check('email', 'El correo es requerido').not().isEmpty(),
    check('email', 'No es un correo valido').isEmail(),
    check('password', 'La contraseña es requerida').not(). isEmpty(),
    check('password', 'La contraseña debe tener entre 8 y 20 caracteres, al menos una mayuscula, una minuscula y un numero').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/),
    validateFields
], register)

router.post('/profilePicture', auth('user'), multer.single('image'), profilePicture)

router.post('/login', [
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'No es un correo valido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('password', 'La contraseña debe tener entre 8 y 20 caracteres, al menos una mayuscula, una minuscula y un numero').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/),
    validateFields
], login)

router.post('/changeState/:userId', [
    check('userId', 'No es un ID de usuario valido').isMongoId(),
    validateFields
], auth('admin'), changeState)

router.get('/', auth('admin'), getUsers)

router.get('/:userId', [
    check('userId', 'No es un ID de usuario valido').isMongoId(),
    validateFields
], auth('admin'), getUser)

router.put('/', [
    check('firstName', 'El nombre es requerido').not().isEmpty(),
    check('firstName', 'El nombre debe tener entre 2 y 40 caracteres').isLength({min: 2, max: 40}),
    check('lastName', 'El apellido es requerido').not().isEmpty(),
    check('lastName', 'El apellido debe tener entre 2 y 40 caracteres').isLength({min: 2, max: 40}),
    validateFields
], auth('user'), updateUser)

router.delete('/:userId', [
    check('userId', 'No es un ID de usuario valido').isMongoId(),
    validateFields
], auth('admin'), deleteUser)

module.exports = router