import express from "express";
import EnquirySwagger from "../swagger/enquiry.swagger";

export default class EnquiryController {
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get("/getAllProductsEnquiries/", this.getAllProductsEnquiries);
    this.router.post("/createProductEnquiry/", this.createProductEnquiry);
  }

  public async getAllProductsEnquiries(req: any, res: express.Response) {
    try {
      console.log({ message: "Fetching All Product Enquiry" });
      const swagger = new EnquirySwagger();
      const response = await swagger.getAllProductsEnquiry();
      res.send(response);
    } catch (err) {
      console.log({ message: "Getting Products Enquiry Operation Failed.", err });
      res.status(500).json(err);
    }
  }

  public async createProductEnquiry(req: any, res: express.Response) {
    try {
      console.log({ message: "Creating Product Enquiry" });
      const swagger = new EnquirySwagger();
      const response = await swagger.createProductEnquiry(req);
      res.status(200).json(response);
    } catch (err) {
      console.log({ message: "Creating Product Enquiry Operation Failed.", err });
      res.status(500).json(err);
    }
  }
}
