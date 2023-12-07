// const { default: mongoose } = require('mongoose');
const mongoose =require('mongoose');


const User = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    amount:{type:Number},
    mobile_no:{type:Number},
    no_of_trees:{type:Number}
})
module.exports = mongoose.model("excelData", User);