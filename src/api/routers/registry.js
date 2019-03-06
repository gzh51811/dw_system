const Router = require('koa-router');

const db = require('../db')//引入封装函数

//创建路由
var router = new Router();

/**
 * ctx是req和res 的综合体,全称：context
 */
router.post('/',async(ctx,next)=>{ 
    //解构前端发来数据
    let {username,password,comfirm,email,mobile,birth,gender,details} = ctx.request.body;

    let data= {username,password,comfirm,email,mobile,birth,gender,details,regtime:Date.now()}
  
    // console.log(data);
    //插入数据：users-表名，data-要传输的数据；
    let res = await db.insert('users',data);

    ctx.body = res//向响应体写一个返回值；
});


//判断用户名是否存在
router.get('/',async(ctx,next)=>{
    let {username} = ctx.query;

    let res = await db.find('users',{username});
    
    if(res.length >0){
        ctx.body = 'no'
    }else{
        ctx.body = 'yes'
    }
});


module.exports = router; //返回到index.js;