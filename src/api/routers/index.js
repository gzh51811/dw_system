
// 主路由
const koa = require('koa');
const Router = require('koa-router');
const koabody = require('koa-body');

// 创建路由
let router = new Router();

// 引入页面路由
const listRouter = require('./goods_list');  //商品列表
const addRouter = require('./goods_add');  //添加商品
const typeRouter = require('./goods_type');  //商品分类
const type_addRouter = require('./goodstype_add');  //添加商品分类
const orderRouter = require('./order_list');  //商品列表
const registryRouter = require('./registry');//用户添加registryRouter是一个对象
const loginRouter = require('./login');//登录路由
const userlistRouter = require('./userlist');//用户列表初始化路由
const delRouter = require('./del');//删除路由
const tokenverifyRouter = require('./tokenverify');//token验证路由
const bianjiRouter = require('./bianji');//编辑路由
const updateRouter = require('./update');//更新路由
const del_manyRouter = require('./del_many');//删除多条路由

// 设置post请求的请求头参数
router.use(koabody({
     // 支持formdata
     multipart:true,

     // 文件支持
     formidable:{
         // 指定保存路径
         uploadDir:'./uploads',
         // 保存文件后缀名
         keepExtensions:true
     }
}));

// 中间件必须是一个函数，使用.routes()方法转换成函数
router.use('/goods_list', listRouter.routes());
router.use('/goods_add', addRouter.routes());
router.use('/goods_type', typeRouter.routes());
router.use('/goodstype_add', type_addRouter.routes());
router.use('/order_list', orderRouter.routes());
router.use('/registry',registryRouter.routes());
router.use('/login',loginRouter.routes());
router.use('/userlist',userlistRouter.routes());
router.use('/del',delRouter.routes());
router.use('/tokenverify',tokenverifyRouter.routes());
router.use('/bianji',bianjiRouter.routes());
router.use('/update',updateRouter.routes());
router.use('/del_many',del_manyRouter.routes());

module.exports = router;