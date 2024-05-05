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
    userName: req.body.userName,
      email,
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
          return res.json({msg:"Incorrect username or password",status: false});
      
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid) 
          return res.json({msg:"Incorrect username or password",status: false});
        
       
        delete user.password;
        return res.json({status:true, user});
        }
        catch (err){
          next(err);
        }
    
      };

  export const setAvatar = async (req, res, next) => {
        try {
          const userId = req.params.id;
          const avatarImage = req.body.image;
        
          const userData = await Users.findByIdAndUpdate(
            userId,
            {
              isAvatarImageSet: true,
              avatarImage,
            },
            { new: true }
          );
          return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
          });
        } catch (ex) {
          next(ex);
        }
      };

      export const getAllUsers = async (req, res, next) => {
        try {
         const users = await Users.find({_id:{$ne: req.params.id}}).select([
          "email",
          "userName",
          "avatarImage",
          "_id",
         ]);

         return res.json(users);

        } catch (ex) {
          next(ex);
        }
      };
    
      
  