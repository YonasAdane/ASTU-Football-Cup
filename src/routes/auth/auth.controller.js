import User from "../../models/user.js";

async function registerHandler(req,res){
    let {name,email,password,}=req.body;
    try {
    const user =User.findOne({email:email})
    if(user){
        return res.status(409).json({message:"Email already registered"});
    }
    const newUser=new User({name,email,password});
    const salt = bcrypt.genSaltSync(10);
    const hash=bcrypt.hash(newUser.password,salt);
        newUser.password=hash;
        newUser.save()
        return res.status(201).json(newUser);   
    } catch (error) {
        throw new error;
    }        
}   

async function logoutHandler(req,res){
    req.logout()
    return res.redirect(CLIENT_URL);
    }


export {
registerHandler,
logoutHandler,
}