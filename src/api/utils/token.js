/*
jsonwebtoken
    生成(加密)  jwt.sign()
    验证(解密)  jwt.very

*/ 

const jwt = require('jsonwebtoken')

let privateKey = 'super';

//生成token
exports.create = (username,expiresIn = '1h')=>{
    //username,details:用于加密的参数；
    //expiresIn :token 的有效期(单位：s),默认两小时
    //privateKey:用于加密的秘钥
    let token = jwt.sign({username},privateKey,{expiresIn});
    return token;
}

//验证token
exports.verify = (token)=>{
    let res = false;
    try{
        //得出解密后的结果Object:{username:xxx...}
        res = jwt.verify(token,privateKey);
    }catch(err){
        res = false;
    }
    console.log(res);
    return res;
}