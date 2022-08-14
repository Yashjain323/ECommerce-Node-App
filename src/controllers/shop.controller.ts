import express from "express";
import ShopSwagger from "../swagger/shop.swagger";

export default class shopController {
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get("/getShopById/:id/", this.getShopById);
    this.router.get("/getAllShops/", this.getAllshops);
    this.router.put("/addFollowers/:id", this.addFollowers);
    this.router.get("/getAllVerifiedShops/", this.getAllVerifiedShops);
    this.router.get("/getAllBlockedShops/", this.getAllBlockedShops);
    this.router.post("/createShop/", this.createshop);
    this.router.put("/updateShop/:id/", this.updateshop);
    this.router.delete("/deleteShop/:id/", this.deleteshop);
    this.router.put("/changeVerifiedStatus/:id", this.changeVerifiedStatus);
    this.router.put("/changeBlockedStatus/:id", this.changeBlockedStatus);
  }

  public async getAllshops(req: any, res: express.Response) {
    try {
      console.log({ message: "Fetching All shops" });
      const swagger = new ShopSwagger();
      const response = await swagger.getAllShops();
      res.send(response);
    } catch (err) {
      console.log({ message: "Getting shops Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getAllVerifiedShops(req: any, res: express.Response) {
    try {
      console.log({ message: "Fetching All Verified Shops" });
      const swagger = new ShopSwagger();
      const response = await swagger.getAllVerifiedShops();
      res.send(response);
    } catch (err) {
      console.log({ message: "Getting shops Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getAllBlockedShops(req: any, res: express.Response) {
    try {
      console.log({ message: "Fetching All Blocked Shops" });
      const swagger = new ShopSwagger();
      const response = await swagger.getAllBlockedShops();
      res.send(response);
    } catch (err) {
      console.log({ message: "Getting shops Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getShopById(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Getting shop by ID: " + id });
        const swagger = new ShopSwagger();
        const response = await swagger.getShopById(id);
        res.status(200).json(response);
      }
    } catch (err) {
      console.log({ message: "Getting Shop Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async createshop(req: any, res: express.Response) {
    try {
      console.log({ message: "Creating shop" });
      const swagger = new ShopSwagger();
      const response = await swagger.createShop(req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Creating shop Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async updateshop(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Updating shop By Id:" + id });
      }
      const swagger = new ShopSwagger();
      const response = await swagger.updateShop(id, req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Updating shop Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async addFollowers(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Adding Followers:" + id });
      }
      const swagger = new ShopSwagger();
      const response = await swagger.addFollowers(id, req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Adding Followers Operation Failed", err });
      res.status(500).json(err);
    }
  }

  public async deleteshop(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Deleting shop by ID : " + id });
      }
      const swagger = new ShopSwagger();
      const response = await swagger.deleteShop(id);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Deleting shop Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async changeVerifiedStatus(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Updating shop By Id:" + id });
      }
      const swagger = new ShopSwagger();
      const response = await swagger.changeVerifiedStatus(id);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Updating shop Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async changeBlockedStatus(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Updating shop By Id:" + id });
      }
      const swagger = new ShopSwagger();
      const response = await swagger.changeBlockedStatus(id);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Updating shop Operation Failed.", err });
      res.status(500).json(err);
    }
  }
}
