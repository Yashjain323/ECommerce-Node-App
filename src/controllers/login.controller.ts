import express from "express";
import LoginSwagger from "../swagger/login.swagger";

export default class LoginController {
  public router = express.Router();
  constructor() {
    this.router.post("/", this.loginFunction);
    this.router.put("/forgot", this.forgotFunction);
  }

  public async loginFunction(req: any, res: express.Response) {
    try {
      console.log({ message: "Making User Sign In" });
      const swagger = new LoginSwagger();
      const response = await swagger.login(req);
      if(response.error === true) res.status(400).json(response);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "SignIn Failed.", err });
      res.status(500).json(err);
    }
  }

  public async forgotFunction(req: any, res: express.Response) {
    try {
      console.log({ message: "Forgot Password proceeding..." });
      const swagger = new LoginSwagger();
      const response = await swagger.forgot(req);
      if(response.error === true) res.status(400).json(response);
      else res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Proceeding failed..", err });
      res.status(500).json(err);
    }
  }

}