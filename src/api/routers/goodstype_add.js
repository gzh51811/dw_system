
// 商品分类接口
const db = require('../db');
const Router = require('koa-router');
const ObjectId = require('mongodb').ObjectId;

const router = new Router();

// 渲染，翻页
router.get('/', async(ctx,next)=>{
    let {page,limit} = ctx.query;
    
    if(limit){
        var res = await db.find('goods_sort',{},page-1,limit*1);
        ctx.body = {
            code : 0,
            data : res,
            conut: res.lenght
        }
    }
});


// 查询id
router.get('/id', async (ctx,next)=>{
    let {id} = ctx.query;
    console.log(id);
    let res = await db.find('goods_sort',{_id:ObjectId(id)});
    ctx.body = res; 
});


// 添加商品
router.post('/add', async (ctx,next)=>{
    // 解构赋值
    let {
        typename,
        remark,
        addTime
    } = ctx.request.body;

    let data = {
        typename,
        remark,
        addTime
    }

    let res = await db.insert('goods_sort',data);
    ctx.body = res;
});


// 修改商品
router.post('/upd', async (ctx,next)=>{
    // 解构赋值
    let {id} = ctx.request.body;
    let {
        typename,
        remark,
        addTime
    } = ctx.request.body;
 
    let data = {
        typename,
        remark,
        addTime
    }
    console.log(typename,remark,addTime);
    let res = await db.update('goods_sort',{'_id':ObjectId(id)},{$set:data});
    ctx.body = res;
});


module.exports = router;