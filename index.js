const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const expiryTime = 30
app.use(bodyParser.json())
const { signAccessToken, verifyAccessToken,signRefreshToken, verifyRefreshToken} = require('./jwt_helper')

app.post('/signIn', async (req,res) => {
    console.log("signIn: ",req.body)
    const {userId} = req.body
    try{
        const acessToken = await signAccessToken(userId)
        console.log("acessToken: ",acessToken)
        const refreshToken = await signRefreshToken(userId)
        console.log("refreshToken: ",refreshToken)
        res.send({acessToken,refreshToken})
    }catch(err){
        res.send({err})
    }
})

app.post('/welcome',async (req,res) => {
    const {token} = req.body
    const {payload} = await verifyAccessToken(token)
    console.log("payload : ",payload)
    if(!payload) {
        res.status(400).end()
    }
    res.send(payload)
    
})

app.post('/refreshToken',async (req,res) => {
    const {refreshToken} = req.body
    console.log("refreshToken : ",refreshToken)
    if (!refreshToken) {
		return res.status(401).end()
	}
    try{
        const {userId} = await verifyRefreshToken(refreshToken)
        console.log("userId : ",userId)
        if(userId) {
            const acessToken = await signAccessToken(userId)
        const refreshToken = await signRefreshToken(userId)
        res.send({acessToken,refreshToken})
        }
        return res.status(401).end()
    }catch(err) {
        return res.status(401).end()
    }
})


//jwt.sign(jwtObj,secrete,expiry)
app.listen(port=3000,()=> {
console.log("Server is running on port : ",port)
})