import Users from "../model/messageModel.js";


export const addMessage = async (req, res, next) => {
try{
    const {from, to, message} = req.body;
    const data =await Users.create({
        message: {text: message},
        users: [from, to],
        sender: from,
    });
    if(data) return res.json({msg: "Message added successfully"});
        return res.json({msg:"failed to add message to database"});

    }
    catch (err){
      next(err);
    }

  };

  export const getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
    
        const messages = await Users.find({
          users: {
            $all: [from, to],
          },
        }).sort({ updatedAt: 1 });
    
        const projectedMessages = messages.map((msg) => {
          return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
          };
        });
        res.json(projectedMessages);
      } catch (ex) {
        next(ex);
      }
    };

  
    
      
  