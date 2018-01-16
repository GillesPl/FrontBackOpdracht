import GameState from "./GameState";
import User from "./../Models/User.model"

export default class LoginState extends GameState {
    constructor(socket) {        
        super();
        this.socket = socket;
        this.user;
        this.body = document.querySelector("body");
    }

    draw() {  
        this.clearBody();
        this.drawChoice();
    }

    drawChoice() {
        this.clearBody();
        const template = '<div class="choice"><button id="login">Login</button><button id="register">Register</button></div>';
        this.body.innerHTML = template;

        this.body.querySelector("#login").addEventListener("click" , function(e) {
            e.preventDefault();
            console.log(e.target);
            this.drawLogin();
        }.bind(this));

        this.body.querySelector("#register").addEventListener("click" , function(e) {
            e.preventDefault();
            this.drawRegister();
        }.bind(this));
    }


    drawRegister() {
        this.clearBody();
        const template = '<div class="register"><form action="/"><input type="text" placeholder="Username" name="username" id="registerUser" /><input type="password" placeholder="Password" name="password" id="registerPassword" /><input type="submit" class="btnregister" value="Register"><input type="button" class="btnback" value="Back"></form></div>';
        this.body.innerHTML = template;

        this.body.querySelector(".btnback").addEventListener("click",function(e) {
            this.drawChoice();
        }.bind(this));

        this.body.querySelector(".btnregister").addEventListener("click" , function(e) {
            e.preventDefault();
            let user;
            user.username = this.body.querySelector("#registerUser").value;
            user.password = this.body.querySelector("#registerPassword").value;
            this.registerCall(user);
            
        }.bind(this)) 
    }

    drawLogin() {
        this.clearBody();
        const template = '<div class="login"><form action="/"><input type="text" placeholder="Username" name="username" id="loginUsername" /><input type="password" placeholder="Password" name="password" id="loginPassword" /><input type="submit" class="btnlogin" value="Login"><input type="button" class="btnback" value="Back"></form></div>';
        this.body.innerHTML = template;

        this.body.querySelector(".btnback").addEventListener("click",function(e) {
            this.drawChoice();
        }.bind(this));

        this.body.querySelector(".btnlogin").addEventListener("click" , function(e) {
            e.preventDefault();
        }.bind(this)) 
    }


    registerCall(user) {
        
    }


    loginCall(user) {

    }

    clearBody() {
        while(this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
    }
}