import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {
     
    if(!isAdmin(req)){
        return res.status(403).json({ message: "Access Denied, Admin Only." });
        return;
    }

    try{
        const existingProduct = await Product.findOne({ productID: req.body.productID });

        if(existingProduct){
            res.status(400).json({ message: "Product with given Product ID already exsists." });
            return;
        }

        const data = {}
        data.productID = req.body.productID;

        if(req.body.name == null){
            res.status(400).json({ message: "Product Name is required." })
            return;
        }
        data.name = req.body.name;
        data.description = req.body.description || "";
        data.altNames = req.body.altNames || [];
        
        if(req.body.price == null){
            res.status(400).json({ message: "Product Price is required." })
            return;
        }
        data.price = req.body.price;
        data.labelledPrice = req.body.labelledPrice || req.body.price;
        data.category = req.body.category || "others";
        data.images = req.body.images || ["/images/default.jpg"];
        data.isVisible = req.body.isVisible;
        data.brand = req.body.brand || "generic";
        data.model = req.body.model || "standard";

        const product = new Product(data);

        await product.save();
        res.status(200).json({ message: "Product Created Successfully" });

    }catch(error){
        res.status(500).json({ message: "Error Creating Product", error: error });
    }
}

export async function getProducts(req, res) {

    try{

        if(isAdmin(req)){
            const products = await Product.find({});
            res.status(200).json({ products });
        }else{
            const products = await Product.find({ isVisible: true });
            res.status(200).json({ products });
        }

    }catch(error){
        res.status(500).json({ message: "Error Fetching Products", error: error });
    }
}

export async function deleteProduct(req, res) {

    if(!isAdmin(req)){
        return res.status(403).json({ message: "Access Denied, Admin Only." });
    }

    try{
        const productID = req.params.productID;
        await Product.deleteOne({ productID: productID });
        res.status(200).json({ message: "Product Deleted Successfully" });
    }catch(error){
        res.status(500).json({ message: "Error Deleting Product", error: error });
    }
}

export async function updateProduct(req, res) {
    if(!isAdmin(req)){
        return res.status(403).json({ message: "Access Denied, Admin Only." });
    }
    try{
        const productID = req.params.productID;
        
        const data = {}

        if(req.body.name == null){
            res.status(400).json({ message: "Product Name is required." })
            return;
        }
        data.name = req.body.name;
        data.description = req.body.description || "";
        data.altNames = req.body.altNames || [];
        
        if(req.body.price == null){
            res.status(400).json({ message: "Product Price is required." })
            return;
        }
        data.price = req.body.price;
        data.labelledPrice = req.body.labelledPrice || req.body.price;
        data.category = req.body.category || "others";
        data.images = req.body.images || ["/images/default.jpg"];
        data.isVisible = req.body.isVisible;
        data.brand = req.body.brand || "generic";
        data.model = req.body.model || "standard";

        await Product.updateOne({ productID: productID }, data);
        res.status(200).json({ message: "Product Updated Successfully" });

    }catch(error){
        res.status(500).json({ message: "Error Updating Product", error: error });
    }
}

export async function getProductsById(req, res) {
    try{
        const productID = req.params.productID;
        const product = await Product.findOne({ productID: productID });
        if(product == null){
            res.status(404).json({ message: "Product Not Found" });
            return;
        }

        if(!product.isVisible){
            if(!isAdmin(req)){
               res.status(403).json({ message: "Product Not Found" });
               return;
            }
        }
        res.status(200).json({ product });

    }catch(error){
        res.status(500).json({ message: "Error Fetching Product", error: error });
    } 
}

export async function seachProducts(req, res) {
}