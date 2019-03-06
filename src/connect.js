// 连接MongoDB数据库
/**
 * 操作MongoDB的步骤
 * 1.连接MongoDB：mongodb.MongoClient.connect(url,callback)
 * 2.连接数据库：client.db(DB_NAME)
 * 3.使用集合：db.collection(COLLECTION_NAME)
 * 4.文档操作：CRUD
 */
const mongodb = require('mongodb');

// 创建Mongo客户端
const MongoClient = mongodb.MongoClient;

// 连接数据库
MongoClient.connect("mongodb://localhost:10000",(err, client)=>{
    if(err) throw err;

    // 连接数据库
    let db = client.db('wang');

    // 使用某个集合
    let collection = db.collection('goods_list');

    // 文档操作
    collection.find
})