const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10


const hashPasswords = async(password)=>{
    let salt = await bcrypt.genSalt(saltRounds)
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

const hashCompare = async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}

const createToken = async(payload)=>{
    let token = await jwt.sign(payload,process.env.SECRETKEY,{expiresIn:'24h'})
    return token
}

const validation = async(req,res,next)=>{
    if(req.headers.authorization)
    {
        let token = req.headers.authorization.split(" ")[1]
        let data = await jwt.decode(token)

        if(Math.floor((+new Date())/1000) < data.exp)
            next()
        else
            res.status(401).send({message:"Token Expired"})
    }
    else
    {
        res.status(400).send({message:"Token Not Found"})
    }
}


module.exports={hashPasswords,hashCompare,createToken,validation}