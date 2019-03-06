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
    let{_id} = ctx.request.body;
    let{password,comfirm,email,mobile,birth,gender,details} = ctx.request.body;
    let data = {password,comfirm,email,mobile,birth,gender,details};

    let res = await db.update('users',{'_id':ObjectId(_id)},{$set:data});
  
    ctx.body = '已修改';
   
})

module.exports = router;