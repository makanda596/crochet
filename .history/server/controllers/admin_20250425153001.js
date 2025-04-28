
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