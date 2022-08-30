const router = require("express").Router();
const Product = require("../models/Product");

//ADD PRODUCT
router.post("/add", async (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        categories: req.body.categories,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
    });

    try{
        const savedProduct = await newProduct.save();

        return res.json({
            status: true,
            message: 'Product Added Successfully',
            data: savedProduct
        });
    }catch(err){
        return res.json({
            status: false,
            message: err.message,
            data: null
        });
    }

});



//PRODUCT LIST
router.post("/get", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qtitle = req.query.title || '';

    try{
        let products;
        
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1}).limit(5); 
        }else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            }); 
        }else{
            products = await Product.find(); 
        } 

        return res.json({
            status: true,
            message: 'Product List Fetch Successful',
            data: products
        });

    }catch(err){
        return res.json({
            status: false,
            message: err.message,
            data: null
        });
    }

});


module.exports = router