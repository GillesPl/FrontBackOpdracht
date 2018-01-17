import User from "./../Models/User.model"

export default class LoginState {
    constructor(socket) {
        this.socket = socket;
        this.user;
        this.body = document.querySelector("body");
    }

    start() {
        this.clearBody();
        this.drawBackground();
        this.drawLogin();
    }

    drawBackground() {
        this.clearBody();
        const template = `
        <div class="background">
           
        </div>
        `;
        this.body.innerHTML = template;
    }

    checkErrors(err) {
        document.querySelector(".errorContainer").innerHTML = err;
    }

    drawRegister() {
        const template = `
        <div class="register">
        <h1>Register</h1>
        <p>Please fill in an email, username and password to register.</p>
        <div class="errorContainer"></div>
            <form class="startForm" action="/">
                <input type="email" placeholder="Email" name="email" id="registerEmail" />
                <input type="text" placeholder="Username" name="username" id="registerUser" />
                <input type="password" placeholder="Password" name="password" id="registerPassword" />
                <button type="submit" class="btn-form btnregister" value="Register">Register</button>              
            </form>
            <a href="" class="formLink">Login</a>
        </div>
       `;
        document.querySelector(".background").innerHTML = template;

        this.body.querySelector(".formLink").addEventListener("click", function (e) {
            e.preventDefault();
            this.drawLogin();
        }.bind(this));

        this.body.querySelector(".btnregister").addEventListener("click", function (e) {
            e.preventDefault();
            var username = this.body.querySelector("#registerUser").value;
            var password = this.body.querySelector("#registerPassword").value;
            var email = this.body.querySelector("#registerEmail").value;
            let user = new User(username, password, email);
            this.registerCall(user);

        }.bind(this));
    }

    drawLogin() {
        const template = `
        <div class="login">
        <h1>Login</h1>
        <p>Please log in using your email and password.</p>
        <div class="errorContainer"></div>
            <form class="startForm" action="/">
                <input type="text" placeholder="Email" name="email" id="loginEmail" />
                <input type="password" placeholder="Password" name="password" id="loginPassword" />
                <button type="submit" class="btn-form btnlogin" value="Login">Login</button>                
            </form>
            <a href="" class="formLink">Register</a>
        </div>
        `;
        document.querySelector(".background").innerHTML = template;

        this.body.querySelector(".formLink").addEventListener("click", function (e) {
            e.preventDefault();
            this.drawRegister();
        }.bind(this));

        this.body.querySelector(".btnlogin").addEventListener("click", function (e) {
            e.preventDefault();
            var password = this.body.querySelector("#loginPassword").value;
            var email = this.body.querySelector("#loginEmail").value;
            let user = new User(null, password, email);
            this.loginCall(user);
        }.bind(this));
    }


    registerCall(user) {
        this.socket.emit("registerUser", {
            user: user
        });
        this.socket.on("requestRegister", function (res) {
            if (res.success == false) this.checkErrors(res.message);
            //console.log(res.user);
        }.bind(this));
    }


    loginCall(user) {
        this.socket.emit("requestLogin", {
            user: user
        });
        this.socket.on("requestLogin", function (res) {
            if (res.success == false) this.checkErrors(res.message);
            //console.log(res.message);
        }.bind(this));
    }

    clearBody() {
        while (this.body.firstChild)  {
            this.body.removeChild(this.body.firstChild);
        }
    }
}