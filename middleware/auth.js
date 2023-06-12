const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {


    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            const decode = jwt.verify(token, "masai");
            if (decode) {
                req.body.userId = decode.userId;
                req.body.user = decode.user;
                next();
            } else {
                res.json({ msg: "Not authorized" })
            }
        } catch (error) {
            res.json({ msg: "please login" })
        }
    }
    else {
        res.json({ msg: "please Login!!" })
    }


}

module.exports = ({ auth })