const Router = require('koa-router');

const db = require('../db')//引入封装函数

const token = require('../utils/token');

//创建路由
var router = new Router();

/**
 * ctx是req和res 的综合体,全称：context
 */
router.post('/',async (ctx,next)=>{ 
    //解构前端发来数据
    let {username,password,mdl} = ctx.request.body;
    let res = await db.find('users',{username,password});
    ctx.body = res;//返给前端的数据；
    res = res[0];

    if(res){ //有结果，发部分信息给前端
        //登录成功：发令牌；
        let _token = token.create(username);

       ctx.body = {
        _id:res._id,
        details:res.details,
        username:res.username,
        token:_token
       }
    }else{
        ctx.body = {
            code:100,
            msg:'fail'
        }
    }
})

module.exports = router; //返回到index.js;