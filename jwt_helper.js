const jwt = require('jsonwebtoken')
const accessTokenSecret = "12345"
const refreshTokenSecret = "123"

module.exports = {
    signAccessToken : (userId) =>{
        return new Promise((resolve,reject) => {
            const palyload = {}
            let token
            try{
                token = jwt.sign(palyload,accessTokenSecret,{ algorithm:"HS256",expiresIn: "30s",audience: userId})
            }catch(err) {
                reject(err)
            }
            
            if(token) resolve(token)
            
        })
    },
    verifyAccessToken : (token) => {
        try{
            const payload = jwt.verify(token,accessTokenSecret)
            return {payload}
        }catch(err) {
            return {err}
        }
        

    },
    signRefreshToken : (userId) =>{
        console.log("signRefreshToken : ",userId)
        return new Promise((resolve,reject) => {
            const palyload = {}
            let token
            try{
                token = jwt.sign(palyload,refreshTokenSecret,{ algorithm:"HS256",expiresIn: "30m",audience: userId})
            }catch(err) {
                reject(err)
            }
            
            if(token) resolve(token)
            
        })
    },
    verifyRefreshToken : (refreshtoken) => {
        console.log("verifyRefreshToken ")
        try{     
            const payload = jwt.verify(refreshtoken,refreshTokenSecret)
            console.log("verifyRefreshToken : ",payload)
            const userId = payload.aud
            return {userId}
        }catch(err) {
            return {err}
        }
        
    }
    
}