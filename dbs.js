const mongoose=require("mongoose")

const DataSchema =new mongoose.Schema({
    Title:String,
    email:String,
    Discription:String,
    PostedBy:String,
    Date:String,
    Photo:String,
    Comments:Array

})
const DataModel=mongoose.model("blogs",DataSchema)
const userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const usermodel=mongoose.model("Userdata",userschema)

module.exports={ DataModel,usermodel }
