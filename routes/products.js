const express = require ('express');

const router = express.Router();
const Prod = require ('../models/Product');


//all products
router.get ('/', async (req,res)=>{
    try {
        const allproducts = await Prod.find();
        res.json(allproducts);

    }
    catch (err){
        console.log('error');
    }

  
 });

// new product 
 router.post ('/', async (req,res)=> {
  
   const myProduct = new Prod ({
    title: req.body.title,
    description : req.body.description,
    price: req.body.price,
    stock : req.body.stock

   }); 
   try {
 const savedProduct = await  myProduct.save()
   res.json (savedProduct);}
   catch (err){
    res.send("wrong");
   }
 });

 //specific proudtc
 router.get ('/:productId', async  (req,res)=> {
 try {
  const theProduct = await  Prod.findById((req.params.productId));
  res.json(theProduct);
 } catch (err){
    console.log('error');
 }
 });
 //delete product
 router.delete ('/:productId', async  (req,res)=> {

    try {
  const removeProduct = await Prod.remove({_id:req.params.productId});
  res.json (removeProduct)
    }
    catch (err){
        console.log('error');
     }

 })

 //update product 
 router.patch ('/:productId', async (req,res)=>{


    try {
       
      const updatedProduct = await Prod.updateOne({_id:req.params.productId},{
        $set:{ title:req.body.title, 
            description: req.body.description,
            price: req.body.price,
            stock : req.body.stock
        }});
      res.json(updatedProduct);
          }
          catch (err){
              console.log('error');
           }


 })


 
 module.exports =router; 