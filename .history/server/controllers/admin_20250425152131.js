
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
    const generateToken = ({id}, process.env.SECRET_KEY,{expiresIn:1 day})
    try{

    }catch{

    }
}