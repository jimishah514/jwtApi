const jwt = require('jsonwebtoken')
const accessTokenSecret = "12345"
const refreshTokenSecret = "123456"

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
            return {payload }
        }catch(err) {
            return {err}
        }
        

    },
    signRefreshToken : (userId) => {
        return new Promise((resolve,reject) => {
            const palyload = {}
            let refreshtoken
            try{
                refreshtoken = jwt.sign(palyload,refreshTokenSecret,{ algorithm:"HS256",expiresIn: "1y",audience: userId})
            }catch(err) {
                reject(err)
            }
            
            if(refreshtoken) resolve(refreshtoken)
            
        })
    },
    verifyRefreshToken : (refreshtoken) => {
        try{
            const palyload = jwt.verify(refreshtoken,accessTokenSecret)
        }catch(err) {
            return err
        }
        return palyload 
    }
    
}