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
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skipIndex = (page - 1) * limit;
        const results = {};
        
        if(page < 0 || page === 0) {
            response = {status : false,message : "invalid page number, should start with 1",data: null};
            return res.json(response)
        }

        if (results) {
            results.results = await Product.find()
            .sort({ _id: 1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();
            res.paginatedResults = results;
            //next();

            return res.json({
                status: true,
                message: 'Product List Fetch Successful',
                data: res.paginatedResults,
                pages: page
            });
        }
    }catch(err){
        return res.json({
            status: false,
            message: err.message,
            data: null
        });
    }

});


module.exports = router