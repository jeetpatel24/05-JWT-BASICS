//check username/password in post(login request)
//if exist create new JWT 
//send back to front end

//setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors');

const login = async (req, res) => {
    const {username, password} = req.body;
    
    //for username, password empty or blank
    // -> mongoose validations
    // -> Joi package
    // -> check in controller


    if(!username || !password) {
        throw new BadRequestError('Please provide username and password');
    }

    //just for Demo, normally provided by DB!!!
    const id = new Date().getDate();

    //try to keep payload small, better experience for user
    //just for Demo, in real projects use long, complex and unguessable String!!!
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'});

    res.status(200).json({msg:'user created', token});
}

const dashboard = async (req, res) => {
    console.log(req.user);

    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({
        msg:`Hello, ${req.user.username}`, 
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}` 
    });
} 

module.exports = {
    login,dashboard
}