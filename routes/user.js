const { authenticateToken } = require("../middleware/authMiddleware")
const User = require("../models/User")
const router = require("express").Router()

router.get("/",async (req,res)=>{
    try{
        const users = await User.find()
        if(users.length==0){
            return res.status(200).json({
                status:true,
                message:"No Users are there in the database"
            })
        }
        res.status(200).json({
            status:true,
            data:users
        })
    }catch(err){
         res.status(404).json({message: "User not found"})
    }
})

router.get("/:id",authenticateToken,async (req,res)=>{
    try{
        if(req.params.id!==req.user.id){
            return res.status(403).json({message:"You can only access profile"})
        }
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({
                status:false,
                message:"User not found"
            })
        }
        res.json({
            status:true,
            data:user
        })
        }catch(err){
            res.status(404).json({message: "User not found"})
        }
})

router.delete("/:id",authenticateToken,async (req,res)=>{
    try{
        if(req.params.id!==req.user.id){
            return res.status(403).json({message:"You can not delete others profile"})
        }
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).json({
                status:false,
                message:"User not found"
                })
        }
        res.json({
            status:true,
            message:"User deleted successfully"
            })
    }catch{
        res.status(404).json({
            status:false,
            message: "User not found"
        })
    }
                
})

module.exports = router
