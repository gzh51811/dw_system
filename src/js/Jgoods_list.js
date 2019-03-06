$(function(){
    // 添加
    $('body').on('click','#add',function(){
        location.href = 'http://localhost:10001/html/goods_add.html';
    });

    // 搜索功能
    $('#search').click(function(){
        let _goodsname = $('#Sgoodsname').val().trim();
        let _type = $('#Stype').val().trim();
        
        if(_goodsname&&(_type=="")){
            let xhr = new XMLHttpRequest();
            xhr.open('post','/goods_list/Sgoodsname',true);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            let req = `goodsname=${_goodsname}`;
            xhr.send(req);
        }
    });
    
})  