const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

// Main Code Here //
// Generating JWT
export default class AuthenticationController {
    public router = express.Router();
    constructor() {
      this.router.get("/generateToken", this.generate);
      this.router.post("/validateToken", this.verifyToken);
    }

public generate(req : Express.Request,res :any) {
	// Validate User Here
	// Then generate JWT Token

	let jwtSecretKey = process.env.JWT_SECRET_KEY;
	let data = {
		time: Date(),
		userId: 12,
	}

	const token = jwt.sign(data, jwtSecretKey);

	res.status(200).json(token);
};

// Verification of JWT
public verifyToken(req:any, res:any){
	// Tokens are generally passed in header of request
	// Due to security reasons.

	//let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
	let jwtSecretKey = process.env.JWT_SECRET_KEY;

        if (req.headers.authorization !== null) { 
        const token = req.headers.authorization
            // retrieve the authorization header and parse out the
            // JWT using the split function
		// const token = req.header(tokenHeaderKey);

		const verified = jwt.verify(token, jwtSecretKey);
		if(verified){
			return res.send("Successfully Verified");
		}else{
			// Access Denied
			return res.status(401);
		}
    }
}
}

