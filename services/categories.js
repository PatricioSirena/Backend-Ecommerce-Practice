const CategoryModel = require('../models/category')

const newCategory = async (body) =>{
    try {
        const categoryExist = await CategoryModel.findOne({name: body.name})

        if(categoryExist){
            return 401
        } else{
            const category = new CategoryModel(body)
            await category.save()
            return 201
        }
    } catch (error) {
        console.log(error)
    }
}

const getAllCategories = async () =>{
    try {
        const result = await CategoryModel.find()
        return result
    } catch (error) {
        console.log(error)
    }
}

const getOneCategory = async (id) =>{
    try {
        const result = await CategoryModel.findById(id)

        if (result === null){
            return 404
        } else{
            return result
        }
    } catch (error) {
        console.log(error)
    }
}

const categoryUpdate = async (id, body) =>{
    try {
        const categoryExist = await CategoryModel.findOne({_id: id})

        if(categoryExist === null){
            return 404
        }else{
            await CategoryModel.findByIdAndUpdate({_id: id}, body)
            return 200
        }
    } catch (error) {
        console.log(error)
    }
}

const categoryDelete = async (id) =>{
    try {
        const categoryExist = await CategoryModel.findOne({_id: id})

        if(categoryExist === null){
            return 404
        }else{
            await CategoryModel.findByIdAndDelete(id)
            return 200
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    newCategory,
    getAllCategories,
    getOneCategory,
    categoryUpdate,
    categoryDelete
}