const Router = require('koa-router');

const db = require('../db')//引入封装函数

//创建路由
var router = new Router();

/**
 * ctx是req和res 的综合体,全称：context
 */
router.get('/',async (ctx,next)=>{ 

    let res = await db.find('users');
  
    ctx.body = {
        "code":0,
        "data":res
    }
   
})

module.exports = router;