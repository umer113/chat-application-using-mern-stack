
const User= require("../model/userModel");
const bcrypt = require('bcrypt');

module.exports.register=async(req,res,next)=>{
    try{
        const {username,email,password} = req.body;
    const usernameCheck = await User.findOne({username});
    if (usernameCheck)
        return res.json({msg:"username already used",status:false});
    const emailCheck = await User.findOne({email});
    if (emailCheck)
        return res.json({msg:"Email already used",status:false});
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        email,
        username,
        password:hashedPassword,
    });
    delete user.password;
    return res.json({status:true})
        
    } catch(error){
        next(error)
    }
};


module.exports.login=async(req,res,next)=>{
    try{
        const {username,password} = req.body;
    const userlogin = await User.findOne({username});
    if (!userlogin)
        return res.json({msg:"Incorrect username or password",status:false});
    const isPassword = await bcrypt.compare(password,userlogin.password);
    if (!isPassword)
        return res.json({msg:"Incorrect username or password",status:false});
    delete userlogin.password;
    return res.json({status:true})   
    } catch(error){
        next(error)
    }
};


module.exports.setAvatar=async(req,res,next)=>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        });

        return res.json({isSet:userData.isAvatarImageSet,
            Image:userData.avatarImage,})
    } catch(error){
        next(error)
    }
};