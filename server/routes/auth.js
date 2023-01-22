const Jwt =  require('jsonwebtoken')

const verifyAdminJWT = (req, res, next) => {
    const token = req.headers.accesstoken
    console.log(token);
    console.log('token');

    if (!token) {
        res.json({ auth: false, message: "We need a token, please give it to us next time" });
    } else {
        Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: "you are failed to authenticate" });
            } else {
                next();
            }
        });
    }
};

module.exports = verifyAdminJWT