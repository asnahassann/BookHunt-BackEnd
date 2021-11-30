const User = require("./user.model");


exports.addUser = async (req,res) => { 
    try {
        const newUser = new User(req.body);
        const token = await newUser.generateAuthToken();
        await newUser.save();
        res.status(200).send({ messages: "success", newUser, token });

    } catch (error) {
        console.log(error)
        res
        .status(418)
        .send({ message: "something went wrong, check server logs" })
        
    }
};

exports.logIn = async (req,res) => {
    try {
        const token = await req.user.generateAuthToken();
        res.status(200).send({user: req.user, token});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "check server logs" })
    }
}