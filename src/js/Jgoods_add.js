$(function () {
    var type = document.querySelector('#type');
    var putawayss = document.querySelector('#putawayss');
    // 获取网址传过来的id,渲染页面
    var data = decodeURI(location.search); //解码的方法
    var str = data.slice(1);
    var goodsid = str.split('=')[1];
    if(goodsid){
        $.ajax({
            type: "post",
            url: "/goods_add/id",
            data: {
                id: goodsid
            },
            success: function (str) {   
                $('#goodsname').val(str[0].goodsname);
                $('#goodsfu').val(str[0].goodsfu);
                $('#oldprice').val(str[0].oldprice);
                $('#nowprice').val(str[0].nowprice);
                $('#repertory').val(str[0].repertory);
                $('#desc').val(str[0].desc);
                $('#status').val(str[0].status);
                type.nextSibling.firstChild.firstChild.value = str[0].type;
                // console.log($("#type").next().first().first()[0]);
                $('#shux').find("input[title=" + str[0].shux + "]").next().addClass("layui-form-checked");
                if (str[0].putaway == 'ON') {
                    $('#putaway').find('div').addClass('layui-form-onswitch');
                    $('#putaway').find('em').text('ON');
                } else {
                    $('#putaway').find('div').removeClass('layui-form-onswitch');
                    $('#putaway').find('em').text('OFF');
                }
            }
        });
    }

    // 获取商品属性
    var val1 = '';
    $('#shux').on('click', 'div', function () {
        var res = $(this).text();
        val1 = res;
    });

    // 获取上架信息
    var val2 = '';
    $('#putaway').on('click', 'div', function () {
        var res = $(this).find('em').text();
        val2 = res;
    });

    // 获取系统时间
    function getNow(s) {
        return s < 10 ? '0' + s : s;
    }
    var myDate = new Date();
    var year = myDate.getFullYear();   //获取当前年
    var month = myDate.getMonth() + 1;   //获取当前月
    var date = myDate.getDate();       //获取当前日
    var now = year + '-' + getNow(month) + "-" + getNow(date);

    // 点击提交
    $('#btn').click(function () {
        let _goodsname = $('#goodsname').val().trim();
        let _goodsfu = $('#goodsfu').val().trim();
        let _oldprice = $('#oldprice').val().trim();
        let _nowprice = $('#nowprice').val().trim();
        let _type = $('#type').val().trim();
        let _repertory = $('#repertory').val().trim();
        let _desc = $('#desc').val().trim();
        let _status = $('#status').val().trim();
        let _addTime = now;
        let _shux = val1;
        let _putaway = val2;

        // 发起ajax请求
        if (_goodsname && _goodsfu && _oldprice && _nowprice && _type && _repertory && _desc && _shux && _putaway && _status) {
            // 以id作为判断条件
            if (goodsid) {  // 修改商品信息
                console.log('修改')
                let xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    if (xhr.status == 200) {
                        let res = JSON.parse(xhr.responseText);
                        if (res.ok) {
                            alert('修改商品成功');
                            location.href = 'http://localhost:10001/html/goods_list.html';
                        }
                    }
                }
                let data = `_id=${goodsid}&goodsname=${_goodsname}&goodsfu=${_goodsfu}&oldprice=${_oldprice}&nowprice=${_nowprice}&type=${_type}&repertory=${_repertory}&desc=${_desc}&shux=${_shux}&putaway=${_putaway}&status=${_status}&addTime=${_addTime}`;
                xhr.open('post', '/goods_add/upd', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(data);

            } else {  // 添加商品
                console.log('添加')
                let xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    if (xhr.status == 200) {
                        let res = JSON.parse(xhr.responseText);
                        if (res.ok) {
                            alert('添加商品成功');
                            location.href = 'http://localhost:10001/html/goods_list.html';
                        }
                    }
                }
                let data = `goodsname=${_goodsname}&goodsfu=${_goodsfu}&oldprice=${_oldprice}&nowprice=${_nowprice}&type=${_type}&repertory=${_repertory}&desc=${_desc}&shux=${_shux}&putaway=${_putaway}&status=${_status}&addTime=${_addTime}`;
                xhr.open('post', '/goods_add/add', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(data);
            }

        } else {
            alert('消息填写有遗漏哦！~');
        }

    });

    // 验证商品名
    $('#goodsname').change(function () {
        let _goodsname = $('#goodsname').val();
        $.ajax({
            type: "get",
            url: "/goods_add",
            async: true,
            data: {
                goodsname: _goodsname
            },
            success: function (str) {
                if (str == 'yes') {
                    $('#five').text('50字以内').css('color', '#999');
                } else if (str == 'no') {
                    $('#five').text('该商品已添加').css('color', 'red');
                }
            }
        });
    });

});