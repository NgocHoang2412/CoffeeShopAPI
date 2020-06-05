const jwt = require('jsonwebtoken');
const config_jwt = require('../config/db.config.js');
const User = require("./user.controller.js");


exports.login = (req, res) => {
    var token;
    try {
        token = jwt.sign(req.body, config_jwt.jwt_secret,{
            algorithm: "HS256",
            expiresIn: config_jwt.jwt_expiry_seconds,
        });

        res.status(201).send({accessToken: token});
        res.cookie("token",token,{ maxAge: config_jwt.jwt_expiry_seconds });
        res.end();
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    User.findByUserName(req.body.username)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({});
            }else{
                let usernameFields = user[0].username;
                let passwordFields = user[0].password;
                if (req.body.password === passwordFields && req.body.username === usernameFields) {
                    req.body = {
                        username: user[0].username,
                        password: user[0].password
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        });
};

exports.welcome = (req, res) => {
    // We can obtain the session token from the requests cookies, which come with every request
    
	const token = req.headers['authorization'];

	// if the cookie is not set, return an unauthorized error
	if (!token) {
		return res.status(401).end();
	}

	var payload
	try {
		// Parse the JWT string and store the result in `payload`.
		// Note that we are passing the key in this method as well. This method will throw an error
		// if the token is invalid (if it has expired according to the expiry time we set on sign in),
		// or if the signature does not match
		payload = jwt.verify(token, config_jwt.jwt_secret)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			return res.status(401).end()
		}
		// otherwise, return a bad request error
		return res.status(400).end()
	}

	// Finally, return the welcome message to the user, along with their
	// username given in the token
	res.send(`Welcome ${req.body.username}!`)
}