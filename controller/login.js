const user_model = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(id) {
    return jwt.sign({ userId: id }, "secretKey");
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await user_model.findAll({ where: { email } });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    throw new Error("somthing went wrong");
                }
                if (result === true) {
                    res
                        .status(200)
                        .json({
                            success: true,
                            message: "User logged successfully",
                            token: generateAccessToken(user[0].id),
                        });
                } else {
                    return res
                        .status(400)
                        .json({ success: false, message: "User password is incorrect" });
                }
            });
        } else {
            return res
                .status(404)
                .json({ success: false, message: "User does not exist" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err });
    }
};
