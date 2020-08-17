const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
    console.log('in here')


    app.post("/defaultPic", passport.authenticate("local"), function (req, res, next) {
        console.log(req);
        db.User.create({
            
        })
})
}
