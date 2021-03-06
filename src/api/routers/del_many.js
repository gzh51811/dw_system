const Router = require('koa-router');

const ObjectId = require('mongodb').ObjectId;

const db = require('../db')//引入封装函数

//创建路由
var router = new Router();

/**
 * ctx是req和res 的综合体,全称：context
 */
router.get('/',async (ctx,next)=>{ 

    //对前端传过来的数据解构
    let{str} = ctx.query;
    let arr = str.split(',');

    arr.map(async function(item){
        let res = await db.delete('users',{_id:ObjectId(item)});
    })
  
    ctx.body = '已删除';
   
})

module.exports = router;