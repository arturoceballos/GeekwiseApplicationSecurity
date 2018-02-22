// event handler for login action
MyBlogApp.loginHandler = function(e) {
    e.preventDefault();
    console.log(e);
    let email = MyBlogApp.getFormInput(e, 'email');
    let password = MyBlogApp.getFormInput(e, 'password');
    MyBlogApp.spin();
    MyBlogApp.request('POST', '/user/login', { email: email, password: password }, (status, data) => {
        console.log(status, data);
        MyBlogApp.spinStop();
        if (status === 200) {
            setCookie('username', data.data.username, .5);
            document.location.href = '/users/welcome';
        } else if (status === 404) {
            MyBlogApp.toast('danger', data.message);
        }
    });
}

// setup the event handler
window.onload = function() {
    document.querySelector("form#login-form").addEventListener('submit', MyBlogApp.loginHandler);
}

setCookie = function (cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}