import express from "express";
import BannerSwagger from "../swagger/shopBanner.swagger";

export default class ShopBannerController {
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get("/getById/:id/", this.getBannerById);
    this.router.get("/getAll/", this.getAllBanners);
    this.router.get("/getAllBannersByShopId/:id", this.getAllBannersByShopId);
    this.router.post("/create/", this.createBanner);
    this.router.put("/update/:id/", this.updateBanner);
    this.router.delete("/delete/:id", this.deleteBanner);
    this.router.delete("/deleteImages/:id",this.deleteBannerImages)
  }

  public async getAllBanners(req: any, res: express.Response) {
    try {
      console.log({ message: "Fetching All Banners" });
      const swagger = new BannerSwagger();
      const response = await swagger.getAllBanners();
      res.send(response);
    } catch (err) {
      console.log({ message: "Getting Banners Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getAllBannersByShopId(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
      console.log({ message: "Fetching All Banners By Shop Id" });
      const swagger = new BannerSwagger();
      const response = await swagger.getAllBannersByShopId(id);
      res.send(response);
    }
   } catch (err) {
      console.log({ message: "Getting Banners Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async getBannerById(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Getting Banner by ID: " + id });
        const swagger = new BannerSwagger();
        const response = await swagger.getBannerById(id);
        res.status(200).json(response);
      }
    } catch (err) {
      console.log({ message: "Getting Banner Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async createBanner(req: any, res: express.Response) {
    try {
      console.log({ message: "Creating Banner" });
      const swagger = new BannerSwagger();
      const response = await swagger.createBanner(req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Creating Banner Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async updateBanner(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Updating Banner By Id:" + id });
      }
      const swagger = new BannerSwagger();
      const response = await swagger.updateBanner(id, req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Updating Banner Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async deleteBanner(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Deleting Banner by ID : " + id });
      }
      const swagger = new BannerSwagger();
      const response = await swagger.deleteBanner(id,false,req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Deleting Banner Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async deleteBannerImages(req: any, res: express.Response) {
    try {
      let id = req.params.id;
      if (!id) {
        console.log({ message: "Request Parameter ID not found." });
      } else {
        console.log({ message: "Deleting Banner Images by ID : " + id });
      }
      const swagger = new BannerSwagger();
      const response = await swagger.deleteBannerImages(id,true,req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Deleting Banner Images Operation Failed.", err });
      res.status(500).json(err);
    }
  }
}
