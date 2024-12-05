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

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(401).json({ msg: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const age = 24 * 3600 * 1000 * 7;
        const token = jwt.sign(
            {
                 id: user.id,
                 isAdmin : true // used this as role based authorization
            },
            process.env.JWT_SECRET_KEY,
            {
            expiresIn: age
            }
        );

        const { password: _, ...data } = user;

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age,
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json(data);
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({ msg: "Failed to login" });
    }
};

export const logout =async(req , res)=>{
    res.clearCookie("token").status(200).json({
        msg : "Logout successfully"
    })
}


// authorization

// for checking logged in
export const shouldLogged =async(req , res)=>{
    const token  = req.cookies.token;
    if(!token){
        res.send(401).json({msg : "You are not authenticated"});
    }

    // validation of token
    jwt.verify(token , process.env.JWT_SECRET_KEY ,  async function(payload , err){
        // payload will contain isAdmin info
        if(err){
            res.status(403).json({msg : "Token in invalid"});
        }
    })
    res.status(200).json({
        msg : "You are authenticated"
    })
}


// for checking admin or not 
export const shouldAdmin =async(req , res)=>{
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({
            msg : "You are not authenticated"
        })
    }

    // validation of toke 
    jwt.verify(token , process.env.JWT_SECRET_KEY , async function(payload , err){
        if(err){
            res.status(403).json({msg : "Token in invalid"});
        }
        // otherwise 
        if(!payload.isAdmin){
            res.status(403).json({
                msg: "You are not an authorized member"
            })
        }
    })
    res.status(200).json({
        msg: "You are authenticated"
    })
}