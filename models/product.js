import mongoose, { model } from "mongoose";

const product =  new mongoose.Schema({
    productID :{
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    altNames : {
        type : [String],
        default : []
    },
    price : {
        type : Number,
        required : true
    },
    labelledPrice : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        default : "others"
    },
    images : {
        type : [String],
        default : ["/images/default.jpg"]
    },
    isVisible : {
        type : Boolean,
        default : true,
        required : true
    },
    brand : {
        type : String,
        default : "generic"
    },
    model : {
        type : String,
        default : "standard"
    },
})

const Product = mongoose.model('Product', product);

export default Product;