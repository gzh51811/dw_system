$(function(){

    var typename = document.querySelector('#typename');
    var remark = document.querySelector('#remark');

    // 获取网址传过来的id,渲染页面
    var data = decodeURI(location.search); //解码的方法
    var str = data.slice(1);
    var _id = str.split('=')[1];

    // 接收id查询渲染
    $.ajax({
        type: "get",
        url: "/goodstype_add/id",
        data: {
            id: _id
        },
        success: function(str){
            $('#typename').val(str[0].typename);
            $('#remark').val(str[0].remark);
        }
    });
    
    // 点击事件
    $('#btn').click(function(){
        let _typename = typename.value.trim();
        let _remark = remark.value.trim();

        // 获取系统时间
        function getNow(s) {
            return s < 10 ? '0' + s: s;
        }
        var myDate = new Date();             
        var year=myDate.getFullYear();   //获取当前年
        var month=myDate.getMonth()+1;   //获取当前月
        var date=myDate.getDate();       //获取当前日
        var now= year+'-'+getNow(month)+"-"+getNow(date);

        let _addTime = now;
        console.log(_typename,_remark,_addTime);

        // 发送ajax请求
        if(_typename&_remark){

            if(_id){  //编辑
                console.log('编辑');
                let xhr = new XMLHttpRequest();
                xhr.onload = ()=>{
                    if(xhr.status == 200){
                        let res = JSON.parse(xhr.responseText);
                        if(res.ok){
                            alert('编辑商品分类成功');
                            location.href = 'http://localhost:10001/html/goods_type.html';
                        }
                    }
                }
                let data = `id=${_id}&typename=${_typename}&remark=${_remark}&addTime=${_addTime}`;
                xhr.open('post','/goodstype_add/upd',true);
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr.send(data);

            }else{  //添加
                console.log('添加');
                let xhr = new XMLHttpRequest();
                xhr.onload = ()=>{
                    if(xhr.status == 200){
                        let res = JSON.parse(xhr.responseText);
                        if(res.ok){
                            alert('添加商品分类成功');
                            location.href = 'http://localhost:10001/html/goods_type.html';
                        }
                    }
                }
                let data = `typename=${_typename}&remark=${_remark}&addTime=${_addTime}`;
                xhr.open('post','/goodstype_add/add',true);
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr.send(data);
            }
        }else{
            alert('消息填写有遗漏哦！~');
        }

    });
})