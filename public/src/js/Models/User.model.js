export default class User {


    constructor(username,password, mail) {
        this.username = username;
        this.password = password;
        this.mail = mail;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    getPassword() {
        return this.password;
    }

    getEmail() {
        return this.mail;
    }

    setEmail(email) {
        this.mail = mail;
    }
}