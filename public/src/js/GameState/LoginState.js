import User from "./../Models/User.model"

export default class LoginState  {
    constructor(socket) {        
        this.socket = socket;
        this.user;
        this.body = document.querySelector("body");
    }

    start() {  
        this.clearBody();
        this.drawChoice();
    }

    drawChoice() {
        this.clearBody();
        const template = '<div class="choice"><button id="login">Login</button><button id="register">Register</button></div>';
        this.body.innerHTML = template;

        this.body.querySelector("#login").addEventListener("click" , function(e) {
            e.preventDefault();
            //console.log(e.target);
            this.drawLogin();
        }.bind(this));

        this.body.querySelector("#register").addEventListener("click" , function(e) {
            e.preventDefault();
            this.drawRegister();
        }.bind(this));
    }


    drawRegister() {
        this.clearBody();
        const template = '<div class="register"><form action="/"><input type="email" placeholder="Email" name="email" id="registerEmail" /><input type="text" placeholder="Username" name="username" id="registerUser" /><input type="password" placeholder="Password" name="password" id="registerPassword" /><input type="submit" class="btnregister" value="Register"><input type="button" class="btnback" value="Back"></form></div>';
        this.body.innerHTML = template;

        this.body.querySelector(".btnback").addEventListener("click",function(e) {
            this.drawChoice();
        }.bind(this));

        this.body.querySelector(".btnregister").addEventListener("click" , function(e) {
            e.preventDefault();
            var username = this.body.querySelector("#registerUser").value;
            var password = this.body.querySelector("#registerPassword").value;
            var email = this.body.querySelector("#registerEmail").value;
            let user = new User(username,password,email);
            this.registerCall(user);
            
        }.bind(this)) 
    }

    drawLogin() {
        this.clearBody();
        const template = '<div class="login"><form action="/"><input type="text" placeholder="email" name="email" id="loginEmail" /><input type="password" placeholder="Password" name="password" id="loginPassword" /><input type="submit" class="btnlogin" value="Login"><input type="button" class="btnback" value="Back"></form></div>';
        this.body.innerHTML = template;

        this.body.querySelector(".btnback").addEventListener("click",function(e) {
            e.preventDefault();
            this.drawChoice();
        }.bind(this));

        this.body.querySelector(".btnlogin").addEventListener("click" , function(e) {
            e.preventDefault();
            var password = this.body.querySelector("#loginPassword").value;
            var email = this.body.querySelector("#loginEmail").value;
            let user = new User(null,password,email);
            this.loginCall(user);
        }.bind(this)) 
    }


    registerCall(user) {
        this.socket.emit("registerUser" , {user: user});
    }


    loginCall(user) {
        this.socket.emit("requestLogin" , {user : user});
        this.socket.on("requestLoginFail", function(res) {
            console.log(res.message);
        })
    }

    clearBody() {
        while(this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
    }
}