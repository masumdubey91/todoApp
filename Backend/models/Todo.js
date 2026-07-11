const mongoose =require("mongoose");
const todoSchema= new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false,

    },
},
    {
        timestamps:true,
    }
)
module.exports=mongoose.model("Todo",todoSchema);
 