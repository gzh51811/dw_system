
// 商品列表接口
const db = require('../db');
const Router = require('koa-router');
const ObjectId = require('mongodb').ObjectId;

const router = new Router();

// 渲染，翻页
router.get('/', async(ctx,next)=>{
    let {page,limit} = ctx.query;
    
    if(limit){
        var res = await db.find('goods_list',{},page-1,limit*1);
        ctx.body = {
            code : 0,
            data : res,
            conut: 11
        }
    }
});

// 删除单条
router.post('/del', async(ctx,next)=>{

    let {_id} = ctx.request.body;
    let res = await db.delete('goods_list',{_id:ObjectId(_id)});
    ctx.body = {
        code : 0,
        data : res
    }
});

// 删除多条
router.get('/delAll', async(ctx,next)=>{
    let {str} = ctx.query;
    let arr = str.split(',');

    arr.map(async (item)=>{
        let res = await db.delete('goods_list', {"_id": ObjectId(item)});
    });
    
    ctx.body = { code: 0 };
});


module.exports = router;
