const Cart = require('../models/cart');

const addToCart = (req,res)=>{
    Cart.findOne({user:req.user._id}).exec((error,cart)=>{
        if(error){
            return res.status(400).json({error});
        };
       
        if(cart){ 
            
            //if cart exists then update cart by quantity 1
            
           const item =  cart.cartItems.find((c)=>{
                return c.product== req.body.cartItems.product;

            });
            
           
            if(item){
                console.log('executing');
               Cart.findOneAndUpdate({'user': req.user._id,'cartItems.product': req.body.cartItems.product},
               {
                  "$set":{
                      "cartItems.$":{
                          ...req.body.cartItems,
                          quantity: item.quantity+ req.body.cartItems.quantity
                      }
                  } 
               },(error,data)=>{
                   if(error){
                    res.status(400).json(error);
                   }else{
                    res.status(400).json("Item Added To Cart");
                   }
               })

            }else{
                Cart.findOneAndUpdate({user: req.user._id},{
                
                    $push:{
                        cartItems: req.body.cartItems
                    }
                },(error,data)=>{
                    if (error) {
                        res.status(400).json(error);
                    } else {
                        res.status(200).json({message: "Item Added To Cart"});
                    }
                });
                

            }
            

        }else{
            //if cart not exist then create a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems],
        
            });
        
            cart.save((error,data)=>{
                if(error){
                    res.status(400).json({error})
                }else{
                    res.status(201).json({message: "Item added to cart Successfully"});
                }
            })

        }
    });
    
    
}

module.exports = {
    addToCart,
}