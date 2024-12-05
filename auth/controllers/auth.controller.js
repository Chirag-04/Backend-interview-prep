export const register=async(req , res)=>{
    // 1. catch the username email password
    // 2. hash the password with a salting value
    // 3. create new user
    const {username , email , password} = req.body;
    try{
        const hashedPassword =  await bcrypt.hash(password , 10);
        // prisma.model.creat({data })
        const newUser =  prisma.model.create({
            username,
            email,
            password : hashedPassword
        }) 

        console.log(newUser);
        res.status(200).json({
            msg : "User Created"
        })
    }catch(err){
        console.log(err);
        res.status(201).json({
            msg : "Failed to create user"
        })
    }
}