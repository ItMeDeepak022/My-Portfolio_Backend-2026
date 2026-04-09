let mongoose=require('mongoose')

let authSchema=new mongoose.Schema({
    name:{
        type:String,
        require
    },
    email:{
        type:String,
        require
    },
    password:{
        type:String,
        require
    }
})

module.exports=mongoose.model('authentication',authSchema)