import Users from "../model/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
try{
   const {userName, email, password}=req.body;
    const userNameCheck = await Users.findOne({userName});
    if(userNameCheck)
      return res.json({msg:"userName already Used",status: false});
    
    const emailCheck= await Users.findOne({email});
    if(emailCheck)
    return res.json({msg:"email already Used",status: false});

    const hashedPassword= await bcrypt.hash(password,10);
    const user = await Users.create({
      email,
      userName,
      password:hashedPassword,
    });
    delete user.password;
    return res.json({status:true, user});
    }
    catch (err){
      next(err);
    }

  };

  export const login = async (req, res, next) => {
    try{
       const {userName, password}=req.body;
        const user = await Users.findOne({userName});
        if(!user)
          return res.json({msg:"Incorrect userName or password",status: false});
      
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid) 
          return res.json({msg:"Incorrect userName or password",status: false});
        
       
        delete user.password;
        return res.json({status:true, user});
        }
        catch (err){
          next(err);
        }
    
      };
    
      
  