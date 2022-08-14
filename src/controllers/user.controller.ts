import express from "express";
import UserSwagger from "../swagger/user.swagger";

export default class UserController {
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get("/getUser/:id/", this.getUserById);
    this.router.get("/getAllUsers/", this.getAllUsers);
    this.router.post("/createUser/", this.createUser);
    this.router.put("/updateUser/:id/", this.updateUser);
    this.router.delete("/deleteUser/:id/", this.deleteUser);
  }

  public async getAllUsers(req: any, res: express.Response) {
    try {
      console.log({ message: "Fetching All User" });
      const swagger = new UserSwagger();
      const response = await swagger.getAllUsers();
      res.send(response);
    } catch (err) {
      console.log({ message: "Getting Users Operation Failed.", err });
      res.status(500).json(err);
    }
  }


  public async getUserById(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Getting User by ID: " + id });
        const swagger = new UserSwagger();
        const response = await swagger.getUserById(id);
        res.status(200).json(response);
      }
    } catch (err) {
      console.log({ message: "Getting User Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async createUser(req: any, res: express.Response) {
    try {
      console.log({ message: "Creating User" });
      const swagger = new UserSwagger();
      const response = await swagger.createUser(req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Creating User Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async updateUser(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Updating User By Id:" + id });
      }
      const swagger = new UserSwagger();
      const response = await swagger.updateUser(id, req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Updating User Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async deleteUser(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Deleting User by ID : " + id });
      }
      const swagger = new UserSwagger();
      const response = await swagger.deleteUser(id);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Deleting User Operation Failed.", err });
      res.status(500).json(err);
    }
  }
}
