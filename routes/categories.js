const express = require('express')
const router = express.Router()
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categories')
const auth = require('../middleware/auth')
const { check } = require('express-validator')
const validateFields = require('../middleware/validateFields')

router.post('/', [
    check('name', 'El nombre de la categoria es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener entre 2 y 30 caracteres').isLength({ min: 2, max: 30 }),
    validateFields
], auth('admin'), createCategory)

router.get('/', getCategories)

router.get('/:categoryId', [
    check('categoryId', 'No es un ID valido').isMongoId(),
    validateFields
], getCategory)

router.put('/:categoryId',
    check('categoryId', 'No es un ID valido').isMongoId(),
    check('name', 'El nombre de la categoria es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener entre 2 y 30 caracteres').isLength({ min: 2, max: 30 }),
    validateFields
    , auth('admin'), updateCategory)

router.delete('/:categoryId',
    check('categoryId', 'No es un ID valido').isMongoId(),
    validateFields
    , auth('admin'), deleteCategory)

module.exports = router