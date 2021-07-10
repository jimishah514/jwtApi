const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const expiryTime = 30
app.use(bodyParser.json())
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken} = require('./jwt_helper')

app.post('/signIn', async (req,res) => {
    const {userId} = req.body
    try{
        const acessToken = await signAccessToken(userId)
        const refreshToken = await signRefreshToken(userId)
        res.send({acessToken,refreshToken})
    }catch(err){
        res.send({err})
    }
})

app.post('/welcome',async (req,res) => {
    const {token} = req.body
    const response = await verifyAccessToken(token)
    console.log("response : ",response)
    if(!response.payload) {
        res.status(400).end()
    }
    res.send(response.payload)
    
})

app.post('/refreshToken',async (req,res) => {
    const {userId} = req.body
    if (!userId) {
		return res.status(401).end()
	}
    try{
        const acessToken = await signAccessToken(userId)
        const refreshToken = await signRefreshToken(userId)
        res.send({acessToken,refreshToken})
    }catch(err) {
        return res.status(401).end()
    }
})


//jwt.sign(jwtObj,secrete,expiry)
app.listen(port=3000,()=> {
console.log("Server is running on port : ",port)
})