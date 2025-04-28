
export const adminSignup = async (req,res)=>{
    try {
        const {username,password}= req.body
        const hashPassword = await bcrypt.hash(password,10)

        const newAdmin = new Admin({
            username,password:hashPassword
        })
        newAdmin.save()
        res.json(newAdmin)
    } catch (error) {
        res.json(error)
    }
}
export const adminLogin = async (req,res)=>{
    const generateToken = (id)=>{
    ({id}, process.env.SECRET_KEY,{expiresIn:"20mins"})
}
    try{
        const {username,password} = req.body

        const admin = await User.findOne({username})
        if(!admin){
            res.json({essage:"username does not exist"})
        }
        const ispassword = await bcrypt.compare(password, admin.password,)
        if(!ispassword){
            res.json({message:"incorect password"})
        }
        res.json({
            message:"admin logged in",
            admin:{
                username,
                password:undefined
            },
            token:generateToken(admin._id)
        })
    }catch(error){
        res.json(error)
    }
}
 
export const update = async(req,res)=>{
    const{id} = admin.req.id
    const {username,password}=req.body
    try{
        if (username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername && existingUsername._id.toString() !== id) {
                return res.status(400).json({ message: "Username already exists. Please try another." });
            }
        }
        let updatedFields = { ...req.body };
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ message: "Password must be at least 8 characters long." });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }


        // Update user details
        const updatedUser = await User.findByIdAndUpdate({id}, updatedFields, { new: true });

        res.status(200).json({ message: "User updated successfully", updatedUser });

    }catch(error){
        res.json(error.message)
    }
}


export const checkAuth = async (req, res) => {

    try {
        const existingadmin = await Admin.findById(req.admin.id).select("-password");
        if (!existingadmin) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user: existingadmin });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};