const mongoose = require('mongoose');
const config = require('config');

const uri = config.get('DB_STRING')

exports.connecttoDB=()=>{
    mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    
    }).then(()=>{
        console.log("database connect hogya")
    })
    .catch((e)=>{
        console.log("Error:-database connect nhi hua");
    })
}