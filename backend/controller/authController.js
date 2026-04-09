const authModel = require("../model/auth.model")
let bcrypt = require('bcrypt')
let jwt=require('jsonwebtoken')
let saltRounds = 10

let login = async (req, res) => {
    let {email, password } = req.body

    let existUser = await authModel.findOne({ email })

    if (existUser) {
        let dbpassword = existUser.password
         
        var token = jwt.sign({userId:existUser._id},process.env.tokenKey);

        if (bcrypt.compareSync(password, dbpassword)) {

            res.send({
                status: true,
                message: "login Done..",
                token:token
            })
        }
        else {

            res.send({
                status:false,
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

module.exports = { login, registration }