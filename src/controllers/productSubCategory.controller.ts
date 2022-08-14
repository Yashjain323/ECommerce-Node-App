import express from "express";
import ProductSubCategorySwagger from "../swagger/productSubCategory.swagger";

export default class ProductSubCategoryController {
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get("/getAll", this.getAllProductSubCategory);
    this.router.get("/getAllVerified", this.getAllVerifiedProductSubCategories);
    this.router.get("/getById/:id", this.getProductSubCategory);
    this.router.get("/getSubCategoriesByProductCategory/:id",this.getSubCategoriesByProductCategory);
    this.router.post("/create", this.createProductSubCategory);
    this.router.put("/update/:id",this.updateProductSubCategory);
    this.router.put("/changeStatus/:id",this.verifyProductSubCategory);
    this.router.delete("/delete/:id",this.deleteProductSubCategory
    );
  }

  public async getAllProductSubCategory(req:any, res: express.Response) {
    try {
      console.log({message:"Getting All the Product SubCategories"})
      const controller = new ProductSubCategorySwagger();
      const response = await controller.getAllProductSubCategory();
      return res.json(response);
    } catch (err) {
      console.log({message: "Getting Product Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }

  public async getAllVerifiedProductSubCategories(req:any, res: express.Response) {
    try {
      console.log({message:"Getting all Verified Product Sub Categories"});
      const controller = new ProductSubCategorySwagger();
      const response = await controller.getAllVerifiedProductSubCategories();
      return res.json(response);
    } catch (err) {
      console.log({message: "Getting Product Category Operation Failed.", err})
      res.status(500).json(err);
    }
  }

  public async getProductSubCategory(req:any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found."});
      } else {
        console.log({
          message: "Getting ProductSubCategory by ID : " + id,
        });
      }
      console.log({ message: "Fetching Your ProductSubCategory" });
      const swagger = new ProductSubCategorySwagger();
      const response = await swagger.getProductSubCategory(id);
      return res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Getting ProductSubCategory Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getSubCategoriesByProductCategory(req:any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found."});
      } else {
        console.log({
          message: "Getting ProductSubCategory by ID : " + id,
        });
      }
      console.log({ message: "Fetching Your ProductSubCategory" });
      const swagger = new ProductSubCategorySwagger();
      const response = await swagger.getSubCategoriesByProductCategory(id);
      return res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Getting ProductSubCategory Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async createProductSubCategory(req:any, res: express.Response) {
    try {
      console.log({message:"Creating Product SubCategory.."})
      const controller = new ProductSubCategorySwagger();
      const response = await controller.createProductSubCategory(req);
      return res.json(response);
    } catch (err) {
      console.log({message: "Creating Product Sub Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }

  public async updateProductSubCategory(req:any, res: express.Response) {
    try {
      let id = req.params.id;
      console.log({message:"Updating Product SubCategory..."})
      const controller = new ProductSubCategorySwagger();
      const response = await controller.updateProductSubCategory(id, req);
      return res.json(response);
    } catch (err) {
      console.log({message: "Updating Product Sub Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }

  public async verifyProductSubCategory(req:express.Request, res: express.Response) {
    try {
      let id = req.params.id;
      console.log({message:"Updating Product SubCategory..."})
      const controller = new ProductSubCategorySwagger();
      const response = await controller.verifyProductSubCategory(id);
      return res.json(response);
    } catch (err) {
      console.log({message: "Updating Product Sub Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }

  public async deleteProductSubCategory(req: express.Request,res: express.Response) {
    try {
      console.log({message:"Deleting Product SubCategory"})
      let id = req.params.id;
      const controller = new ProductSubCategorySwagger();
      const response = await controller.deleteProductSubCategory(id);
      return res.json(response);
    } catch (err) {
      console.log({message: "Deleting Product Sub Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }
}
