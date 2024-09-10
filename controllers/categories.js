const categoryServices = require('../services/categories')

const createCategory = async (req, res) =>{
    try {
        const result = await categoryServices.newCategory(req.body)

        if(result === 401){
            res.status(401).json({msg: 'La categoria ya se encuentra en la base de datos'})
        } else{
            res.status(201).json({msg: 'Categoria creada correctamente'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getCategories = async (req, res) =>{
    try {
        const result = await categoryServices.getAllCategories()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getCategory = async (req, res) =>{
    try {
        const result = await categoryServices.getOneCategory(req.params.categoryId)

        if(result === 404){
            res.status(404).json({msg: 'No encontramos la categoria en la base de datos'})
        }else{
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateCategory = async (req, res) =>{
    try {
        const result = await categoryServices.categoryUpdate(req.params.categoryId, req.body)

        if(result === 404){
            res.status(404).json({msg: 'No encontramos la categoria en la base de datos'})
        } else{
            res.status(200).json({msg: 'Categoria actualizada correctamente'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteCategory = async (req, res) =>{
    try {
        const result = await categoryServices.categoryDelete(req.params.categoryId)

        if(result === 404){
            res.status(404).json({msg: 'No encontramos la categoria en la base de datos'})
        } else{
            res.status(200).json({msg: 'Categoria eliminada correctamente'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}