const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const app=express()
app.use(cors())
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
const { DataModel,usermodel }=require("./dbs")
mongoose.connect("mongodb+srv://aftab:aftab35520@cluster0.zja2qb6.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")

app.post("/postblog",async(req,res)=>{
    const post=new DataModel
    post.PostedBy=req.body.PostedBy
    post.email=req.body.email
    post.Title=req.body.Title
    post.Discription=req.body.Discription
    post.Date=req.body.Dates
    post.Photo=req.body.Images
    post.Comments=req.body.comments
    await post.save()
    .then(res.json("Blog Posted Successfully"))
    console.log(req.body.comments)

})

app.post("/user",async(req,res)=>{
    const data=await usermodel.findOne({email:req.body.email})
    if(data===null){
        const user=new usermodel
        user.name=req.body.Name
        user.email=req.body.email
        user.password=req.body.password
        await user.save()
        .then(
            res.json("Registration successfull X")
        )
    }
    else{
        res.json("user already exist")
    }

})

app.post("/login",async(req,res)=>{
    const users=await usermodel.find({
        email:req.body.email,
        password:req.body.password
    })
    if(users.length==1){
        res.json(users)
    }
    else{
        res.json("login failed")
    }
})

app.get("/blogs",async(req,res)=>{
    const blogs=await DataModel.find({})
    res.json(blogs)
})


app.post("/deleteblog",async(req,res)=>{
    await DataModel.deleteOne({_id:req.body.id})
})

app.post("/comment",async(req,res)=>{
    await DataModel.updateOne({_id:req.body.id},{$push:{Comments:req.body.comment}})
})

app.listen(4000,()=>{
    console.log("server is live")
})