const Category = require('../models/category');
const slugify = require('slugify');


const createCategories  =(categories,parentId=null)=>{
    const categoryList= [];
    let category;
    if(parentId==null){
        category = categories.filter(cat=>cat.parentId==undefined);
    }else{
        category = categories.filter(cat=>cat.parentId==parentId);
    }

    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories,cate._id) //recursive funtion
        })
    }

    return categoryList;
}


const addCategory = (req,res)=>{
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error,category)=>{
        if(error){
            res.status(400).json({error})
        }else{
            res.status(201).json({message: "Category created Successfully"});
        }
    })
}

const getCategories = (req,res)=>{
    Category.find({}).exec((error,categories)=>{
        if(error){
            res.status(400).json({message: error})
        }else{
            const categoryList = createCategories(categories)
            res.status(400).json({categoryList});
        }
    })
}

module.exports = {
    addCategory,
    getCategories
}