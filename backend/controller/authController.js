const authModel = require("../model/auth.model")
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let saltRounds = 10

let login = async (req, res) => {
    try {
        let { email, password } = req.body

        let existUser = await authModel.findOne({ email })

        if (existUser) {
            let dbpassword = existUser.password

            var token = jwt.sign(
                { userId: existUser._id, tokenVersion: existUser.tokenVersion || 0 },
                process.env.tokenKey,
                {
                    expiresIn: "5min", 
                }
            );

            if (bcrypt.compareSync(password, dbpassword)) {

                res.send({
                    status: true,
                    message: "login Done..",
                    token: token
                })
            }
            else {

                res.send({
                    status: false,
                    message: "Invalid password..",

                })
            }

        }

        else {
            res.send({
                status: false,
                message: "Email doesn't existing..."
            })
        }
    }
    catch (err) {
        return res.send({
            status: false,
            message: err
        })
    }

}

let registration = async (req, res) => {

    let { name, email, password } = req.body

    let checkEmail = await authModel.findOne({ email })

    if (checkEmail) {
        res.send({
            status: false,
            message: "Email already exists"
        });

    }

    else {

        const hash = bcrypt.hashSync(password, saltRounds);

        let obj = {
            name,
            email,
            password: hash
        }
        let data = await authModel.create(obj)

        res.send({
            status: true,
            message: "Registration successfull..",
            data
        });

    }



}

let securityToken = async (req, res) => {

    res.send({
        status: true,
        message: "token varified successfull",
    });

}

const logoutAllDevices = async (req, res) => {
    try {
        const userId = req.userId || req.user?.userId;
        await authModel.updateOne(
            { _id: userId },
            {
                $inc: {
                    tokenVersion: 1
                }
            }
        );

        res.status(200).json({
            success: true,
            message: "Logged out from all devices"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};



module.exports = { login, registration, securityToken ,logoutAllDevices}