
const mongoose =require('mongoose');


const User = new mongoose.Schema({
    name:{type:String,required:true},
    mobile_no:{type:String},
    email:{type:String},
    amount:{type:String},
    no_of_trees:{type:String}
})
module.exports = mongoose.model("Excel_to_json", User);