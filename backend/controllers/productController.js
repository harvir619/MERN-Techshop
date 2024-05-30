import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"

// @desc Fetch All products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})

// @desc Fetch Single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (!product) {
        // If the product is not found, return a 404 status code with an error message
        res.status(404)
        throw new Error('Product not found')
    }    
    
    res.json(product)
})


export { getProducts,getProductById}