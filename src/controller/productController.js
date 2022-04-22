const Product = require('../models/product');
const slugify = require('slugify');

const shortId = require('shortid');


const addProduct = (req,res)=>{
    const {name,price,description,category,quantity,createdBy} = req.body;
    let productPictures= [];
    if(req.files.length>0){
        productPictures = req.files.map(file=>{
            return {img: file.filename};
        })
    }
    const product = new Product({
        name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id, //it is getting from the checkadmin middleware....
    });

    product.save((error,product)=>{
        if(error){
            res.status(400).json({error})
        }else{
            res.status(201).json({message: "Product added Successfully"});
        }
    });
   
}


const getProducts = (req,res)=>{
    Product.find({}).exec((error,products)=>{
        if(error){
            res.status(400).json({message: error})
        }else{
            
            res.status(400).json({products});
        }
    })
}

module.exports = {
    addProduct,
    getProducts
}