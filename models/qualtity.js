const mongoose=require('mongoose')

const quantity=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

    value:{
        type:Number,
        required:true,
    }
})

const Quantity= mongoose.model("Quantity", quantity)

module.exports=Quantity