import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    
    const product = products.find((p) => p._id === Number(req.params.id));
    
    if (!product) {
        // If the product is not found, return a 404 status code with an error message
        return res.status(404).json({ error: 'Product not found' });
    }    
    
    res.json(product)
})

app.listen(port,()=>console.log(`Server running on port ${port}`))
