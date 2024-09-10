const express = require('express')
const router = express.Router()
const {createProduct, deleteProduct, getProducts, updateProduct, getProduct, changeCondition, addImage, deleteImage, addToCart, deleteFromCart, addToFav, deleteFromFav, getProductsCart, getProductsFav} = require('../controllers/products')
const {check} = require('express-validator')
const auth = require('../middleware/auth')
const validateFields = require('../middleware/validateFields')
const multer = require('../middleware/multer')


router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener entre 4 y 30 caracteres').isLength({min: 4, max:30}),
    check('price', 'El precio es requerido').not().isEmpty(),
    check('description', 'La descripción es requerida').not().isEmpty(),
    validateFields
], auth('admin'), createProduct)

router.post('/productState/:productId', [
    check('productId', 'No es un ID valido').isMongoId(),
    validateFields
], changeCondition)

router.post('/addImage/:productId', auth('admin'), multer.single('image'),  addImage)

router.post('/deleteImage/:productId/foto/:imgId', auth('admin'), deleteImage)

router.post('/addToCart/:productId', [check('productId', 'No es un id valido').isMongoId(), validateFields], auth('user'), addToCart)

router.post('/deleteFromCart/:productId', [check('productId', 'No es un id valido').isMongoId(), validateFields], auth('user'), deleteFromCart)

router.post('/addToFav/:productId', [check('productId', 'No es un id valido').isMongoId(), validateFields], auth('user'), addToFav)

router.post('/deleteFromFav/:productId', [check('productId', 'No es un id valido').isMongoId(), validateFields], auth('user'), deleteFromFav)

router.get('/getProductsCart', auth('user'), getProductsCart)

router.get('/getProductsFav', auth('user'), getProductsFav)

router.get('/', getProducts)

router.get('/:productId', [
    check('productId', 'No es un ID valido').isMongoId(),
    validateFields
], getProduct)

router.put('/:productId', [
    check('productId', 'No es un ID valido').isMongoId(),
    validateFields
], updateProduct)

router.delete('/:productId', [
    check('productId', 'No es un ID valido').isMongoId(),
    validateFields
], deleteProduct)

module.exports = router