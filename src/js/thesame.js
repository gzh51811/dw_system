window.onload = function () {

    //token验证：
    let username = document.querySelector('#username');
    let user = localStorage.getItem('username');
    let dengji = document.querySelector('#dengji');
    let out = document.querySelector('#out');

    if (!user) {
        user = {}
    } else {
        user = JSON.parse(user);
    }

    if (user.token) {
        //判断本地是否有token
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            let res = JSON.parse(xhr.responseText);
            if (res.status == 200) {
                username.innerHTML = user.username;
                dengji.innerHTML = $.cookie('details');
            } else {
                $.cookie('the_cookie', null); //移除cookie;
            }
        }
        xhr.open('post', '/tokenverify', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('token=' + user.token)
    }else{
        location.href = 'http://localhost:10001/html/login.html';
    }

    //退出
    out.onclick = () => {
        localStorage.removeItem('username');
        $.cookie('the_cookie', null); //移除cookie;
        location.href = 'login.html';
    }

}