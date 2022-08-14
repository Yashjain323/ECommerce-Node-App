import express from "express";
import ProductCategorySwagger from "../swagger/productCategory.swagger";

export default class ProductCategoryController {
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get("/getAll", this.getAllProductCategory);
    this.router.get("/getAllVerified",this.getAllVerifiedProductCategories);
    this.router.post("/create", this.createProductCategory);
    this.router.get("/getById/:id",this.getProductCategory);
    this.router.put("/changeStatus/:id",this.verifyProductCategory);
    this.router.put("/update/:id", this.updateProductCategory);
    this.router.delete("/delete/:id", this.deleteProductCategory);
  }

  public async getAllProductCategory(req:any, res: express.Response) {
    try {
      console.log({message:"Getting all Product Categories"});
      const controller = new ProductCategorySwagger();
      const response = await controller.getAllProductCategory();
      return res.json(response);
    } catch (err) {
      console.log({message: "Getting Product Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }

  public async getAllVerifiedProductCategories(req:any, res: express.Response) {
    try {
      console.log({message:"Getting all Verified Product Categories"});
      const controller = new ProductCategorySwagger();
      const response = await controller.getAllVerifiedProductCategories();
      return res.json(response);
    } catch (err) {
      console.log({message: "Getting Product Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }

  public async getProductCategory(req:any, res: express.Response) {
    try {
        let id = req.params.id;
        if (!id) {
            console.log({ message: "Request Parameter ID not found." });
        } else {
            console.log({
            message: "Getting Product Category by ID : " + id
            });
        }           
        console.log({ message: "Fetching Your Product Category" })
        const swagger = new ProductCategorySwagger();
        const response = await swagger.getProductCategory(id);
        return res.status(200).json(response);
    } catch (err) {
        console.log({message: "Getting Product Category Operation Failed.", err })
        res.status(500).json(err);
      }
}

  // Basically a route for Signup Process
  public async createProductCategory(req:any, res: express.Response) {
    try {
      console.log({message:"Creating Product Category"});
      const controller = new ProductCategorySwagger();
      const response = await controller.createProductCategory(req);
      return res.json(response);
    } catch (err) {
      console.log({ message: "Creating Product Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }

  public async updateProductCategory(req:any, res: express.Response) {
    try {
      console.log({message:"Updating Product Category"});
      let id = req.params.id;
      const controller = new ProductCategorySwagger();
      const response = await controller.updateProductCategory(id, req);
      return res.json(response);
    } catch (err) {
      console.log({ message: "Updating Product Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }

  public async verifyProductCategory(req:any, res: express.Response) {
    try {
      console.log({message:"Verifying Product Category"});
      let id = req.params.id;
      const controller = new ProductCategorySwagger();
      const response = await controller.verifyProductCategory(id);
      return res.json(response);
    } catch (err) {
      console.log({ message: "Verifying Product Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }

  public async deleteProductCategory(req: express.Request, res: express.Response) {
    try {
      console.log({message:"Deleting Product Category"})
      let id = req.params.id;
      const controller = new ProductCategorySwagger();
      const response = await controller.deleteProductCategory(id);
      return res.json(response);
    } catch (err) {
      console.log({ message: "Deleting Product Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }
}
