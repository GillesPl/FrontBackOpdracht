const socket = io();
mocha.setup('bdd')

mocha.run();

describe("should logged in user", () => {
    var result;
    beforeEach((done) => {
        var user = {
            mail: "kappa@test.be",
            password: "kappa"
        };
        socket.emit("requestLogin", {
            user: user
        });
        socket.on("requestLogin", function (res) {
            result = res;
            done();
        });
    })

    it("should fetch me the user", () => {
        console.log(result)
        expect(result.success).to.be(true)
    })
})