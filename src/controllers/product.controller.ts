import express from "express";
import ProductSwagger from "../swagger/product.swagger";

export default class ProductController {
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get("/getProduct/:id/", this.getProductById);
    this.router.get("/getAllProducts/", this.getAllProducts);
    this.router.put("/likeProduct/:id", this.usersLiking);
    this.router.get("/getAllProductsByShopId/:id", this.getAllProductsByShopId);
    this.router.get("/getProductsByChildCategory/:id",this.getProductsByChildCategoryId);
    this.router.post("/createProduct/", this.createProduct);
    this.router.put("/updateProduct/:id/", this.updateProduct);
    this.router.delete("/deleteProduct/:id/", this.deleteProduct);
  }

  public async usersLiking(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Adding Followers:" + id });
      }
      const swagger = new ProductSwagger();
      const response = await swagger.usersLiking(id, req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Adding Followers Operation Failed", err });
      res.status(500).json(err);
    }
  }

  public async getAllProducts(req: any, res: express.Response) {
    try {
      console.log({ message: "Fetching All Product" });
      const swagger = new ProductSwagger();
      const response = await swagger.getAllProducts();
      res.send(response);
    } catch (err) {
      console.log({ message: "Getting Products Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getAllProductsByShopId(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
      console.log({ message: "Fetching All Products By Shop Id" });
      const swagger = new ProductSwagger();
      const response = await swagger.getAllProductsByShopId(id);
      res.send(response);
    }
   } catch (err) {
      console.log({ message: "Getting Products Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getProductsByChildCategoryId(req:express.Request,res:express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
      console.log({ message: "Fetching All Products By Child Category Id" });
      const swagger = new ProductSwagger();
      const response = await swagger.getProductsByChildCategoryId(id);
      res.send(response);
    }
   } catch (err) {
      console.log({ message: "Getting Products Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getProductById(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Getting Product by ID: " + id });
        const swagger = new ProductSwagger();
        const response = await swagger.getProductById(id);
        res.status(200).json(response);
      }
    } catch (err) {
      console.log({ message: "Getting Product Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async createProduct(req: any, res: express.Response) {
    try {
      console.log({ message: "Creating Product" });
      const swagger = new ProductSwagger();
      const response = await swagger.createProduct(req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Creating Product Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async updateProduct(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Updating Product By Id:" + id });
      }
      const swagger = new ProductSwagger();
      const response = await swagger.updateProduct(id, req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Updating Product Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async deleteProduct(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Deleting Product by ID : " + id });
      }
      const swagger = new ProductSwagger();
      const response = await swagger.deleteProduct(id);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Deleting Product Operation Failed.", err });
      res.status(500).json(err);
    }
  }
}
