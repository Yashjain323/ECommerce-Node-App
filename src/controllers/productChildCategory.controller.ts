import express from "express";
import ProductChildCategorySwagger from "../swagger/productChildCategory.swagger";

export default class ProductChildCategoryController {
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get("/getAll", this.getAllProductChildCategory);
    this.router.get("/getAllVerified", this.getAllVerifiedProductChildCategories);
    this.router.get("/getById/:id",this.getProductChildCategory);
    this.router.get("/getChildCategoriesBySubCategory/:id",this.getChildCategoriesBySubCategory);
    this.router.post("/create", this.createProductChildCategory);
    this.router.put("/update/:id", this.updateProductChildCategory);
    this.router.put("/changeStatus/:id",this.verifyProductChildCategory);
    this.router.delete("/delete/:id", this.deleteProductChildCategory);
  }

  public async getAllProductChildCategory(req:any, res: express.Response) {
    try {
      console.log({ message: "Fetching All ProductChildCategory" });
      const controller = new ProductChildCategorySwagger();
      const response = await controller.getAllProductChildCategory();
      return res.json(response);
    } catch (err) {
      console.log({ message: "GetAllProductCategorys Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getAllVerifiedProductChildCategories(req:any, res: express.Response) {
    try {
      console.log({message:"Getting all Verified Product Categories"});
      const controller = new ProductChildCategorySwagger();
      const response = await controller.getAllVerifiedProductChildCategories();
      return res.json(response);
    } catch (err) {
      console.log({message: "Getting Product Category Operation Failed.", err })
      res.status(500).json(err);
    }
  }

  public async getProductChildCategory(req:any, res: express.Response) {
    try {
        let id = req.params.id;
        if (!id) {
            console.log({ message: "Request Parameter ID not found." });
        } else {
            console.log({message: "Getting Product Child Category by ID : " + id});
        }           
        console.log({ message: "Fetching Your Product Child Category" })
        const swagger = new ProductChildCategorySwagger();
        const response = await swagger.getProductChildCategory(id);
        return res.status(200).json(response);
    } catch (err) {
        console.log({message: "Get Product Child Category Operation Failed.", err })
        res.status(500).json(err);
      }
}

public async getChildCategoriesBySubCategory(req:express.Request,res:express.Response) {
  try {
    let id = req.params.id;
    if (!id) {
      console.log({ message: "Request Parameter ID not found." });
    } else {
    console.log({ message: "Fetching All Child Categories By Sub Category Id" });
    const swagger = new ProductChildCategorySwagger();
    const response = await swagger.getChildCategoriesBySubCategory(id);
    res.send(response);
  }
 } catch (err) {
    console.log({ message: "Getting Child Categories Operation Failed.", err });
    res.status(500).json(err);
  }
}

  // Basically a route for Signup Process
  public async createProductChildCategory(req:any, res: express.Response) {
    try {
      console.log({ message: "Creating / Adding Product Child Category", Body: req.body });
      const controller = new ProductChildCategorySwagger();
      const response = await controller.createProductChildCategory(req);
      return res.json(response);
    } catch (err) {
      console.log({ message: "Create ProductChildCategory Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async updateProductChildCategory(req:any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({message: "Updating ProductChildCategory by ID : " + id, Body: req.body});
      }
      console.log({message:"Updating Product Child Category"})
      const controller = new ProductChildCategorySwagger();
      const response = await controller.updateProductChildCategory(id, req);
      return res.json(response);
    } catch (err) {
      console.log({ message: "Update Product Child Category Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async verifyProductChildCategory(req:any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({message: "Verifying Product ChildCategory by ID : " + id});
      }
      console.log({message:"Verifying Product Child Category"})
      const controller = new ProductChildCategorySwagger();
      const response = await controller.verifyProductChildCategory(id);
      return res.json(response);
    } catch (err) {
      console.log({ message: "Verifying ProductChildCategory Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async deleteProductChildCategory(req: express.Request, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Deleting ProductChildCategory by ID : " + id });
      }
      console.log({message:"Deleting Product Child Category"})
      const controller = new ProductChildCategorySwagger();
      const response = await controller.deleteProductChildCategory(id);
      return res.json(response);
    } catch (err) {
      console.log({ message: "DeleteProductChildCategory Operation Failed.", err });
      res.status(500).json(err);
    }
  }
}
