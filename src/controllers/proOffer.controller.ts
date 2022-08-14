import express from "express";
import ProductOfferSwagger from "../swagger/productOffer.swagger";

export default class ProductOfferController {
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get("/getById/:id/", this.getProductOfferById);
    this.router.get("/getAll/", this.getAllProductOffers);
    this.router.get("/getAllProductOffersByShopId/:id", this.getAllProductOffersByShopId);
    this.router.post("/create/", this.createProductOffer);
    this.router.put("/update/:id/", this.updateProductOffer);
    this.router.delete("/delete/:id/", this.deleteProductOffer);
  }

  public async getAllProductOffers(req: any, res: express.Response) {
    try {
      console.log({ message: "Fetching All Product" });
      const swagger = new ProductOfferSwagger();
      const response = await swagger.getAllProductOffers();
      res.send(response);
    } catch (err) {
      console.log({ message: "Getting Products Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getAllProductOffersByShopId(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
      console.log({ message: "Fetching All Products By Shop Id" });
      const swagger = new ProductOfferSwagger();
      const response = await swagger.getAllProductOfferByShopId(id);
      res.send(response);
    }
   } catch (err) {
      console.log({ message: "Getting Products Operation Failed.", err });
      res.status(500).json(err);
    }
  }


  public async getProductOfferById(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Getting Product by ID: " + id });
        const swagger = new ProductOfferSwagger();
        const response = await swagger.getProductOfferById(id);
        res.status(200).json(response);
      }
    } catch (err) {
      console.log({ message: "Getting Product Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async createProductOffer(req: any, res: express.Response) {
    try {
      console.log({ message: "Creating Product" });
      const swagger = new ProductOfferSwagger();
      const response = await swagger.createProductOffer(req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Creating Product Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async updateProductOffer(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Updating Product By Id:" + id });
      }
      const swagger = new ProductOfferSwagger();
      const response = await swagger.updateProductOffer(id, req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Updating Product Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async deleteProductOffer(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Deleting Product by ID : " + id });
      }
      const swagger = new ProductOfferSwagger();
      const response = await swagger.deleteProductOffer(id);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Deleting Product Operation Failed.", err });
      res.status(500).json(err);
    }
  }
}
