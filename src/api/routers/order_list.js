
// 订单列表接口
const db = require('../db');
const Router = require('koa-router');
const ObjectId = require('mongodb').ObjectId;

const router = new Router();

// 渲染，翻页
router.get('/', async(ctx,next)=>{
    let {page,limit} = ctx.query;
    
    if(limit){
        var res = await db.find('order_list',{},page-1,limit*1);
        ctx.body = {
            code : 0,
            data : res,
            conut: res.lenght
        }
    }
});

// 删除单条
router.post('/del', async(ctx,next)=>{

    let {_id} = ctx.request.body;
    let res = await db.delete('order_list',{_id:ObjectId(_id)});
    ctx.body = {
        code : 0,
        data : res
    }
});

// 数据可视化渲染
router.post('/', async(ctx,next)=>{
 
    var res = await db.find('order_list',{});
    ctx.body = {
        code : 0,
        data : res,
    }

});


module.exports = router;