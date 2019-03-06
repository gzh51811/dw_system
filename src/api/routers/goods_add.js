
// 添加商品接口
const db = require('../db');
const Router = require('koa-router');
const ObjectId = require('mongodb').ObjectId;

const router = new Router();

// 查询id
router.post('/id', async (ctx,next)=>{
    let {id} = ctx.request.body;
    let res = await db.find('goods_list',{_id:ObjectId(id)});
    ctx.body = res; 
});

// 添加商品
router.post('/add', async (ctx,next)=>{
    // 解构赋值
    let {
        goodsname,
        goodsfu,
        oldprice,
        nowprice,
        type,
        repertory,
        desc,
        shux,
        putaway,
        status,
        addTime
    } = ctx.request.body;

    let data = {
        goodsname,
        goodsfu,
        oldprice,
        nowprice,
        type,
        repertory,
        desc,
        shux,
        putaway,
        status,
        addTime
    }

    let res = await db.insert('goods_list',data);
    ctx.body = res;
});

// 修改商品
router.post('/upd', async (ctx,next)=>{
    // 解构赋值
    let {_id} = ctx.request.body;
    let {
        goodsname,
        goodsfu,
        oldprice,
        nowprice,
        type,
        repertory,
        desc,
        shux,
        putaway,
        status,
        addTime
    } = ctx.request.body;
 
    let data = {
        goodsname,
        goodsfu,
        oldprice,
        nowprice,
        type,
        repertory,
        desc,
        shux,
        putaway,
        status,
        addTime
    }

    let res = await db.update('goods_list',{'_id':ObjectId(_id)},{$set:data});
    ctx.body = res;
});

// 验证商品名
router.get('/',async (ctx,next)=>{
    let {goodsname} = ctx.query;

    let res = await db.find('goods_list',{goodsname:goodsname});

    if(res.length>0){
        ctx.body = 'no'   // 不能注册
    }else{
        ctx.body = 'yes'  // 可以注册
    }
})

module.exports = router;