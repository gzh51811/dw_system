const Router = require('koa-router');

const ObjectId = require('mongodb').ObjectId;

const db = require('../db')//引入封装函数

//创建路由
var router = new Router();

/**
 * ctx是req和res 的综合体,全称：context
 */
router.post('/',async (ctx,next)=>{ 

    //对前端传过来的数据解构
    //post-ctx.request.body;
    //get-ctx.query;
    let{_id} = ctx.request.body;

    let res = await db.find('users',{_id:ObjectId(_id)});
  
    ctx.body = res;
   
})

module.exports = router;