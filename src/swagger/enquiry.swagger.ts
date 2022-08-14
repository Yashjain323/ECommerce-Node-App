import { Get, Post, Put, Delete, Route, Tags, Body } from "tsoa";
import { EnquiryService } from "../services/enquiry.service";

interface Response {
  error: boolean;
  message: string;
}

interface IEnquiry {
  productId: string;
  title: string;
  description: string;
  medium: string;
}

@Route("enquiry")
@Tags("Enquiry")
export default class EnquirySwagger {
  @Post("/createProductEnquiry")
  public async createProductEnquiry(@Body() request: IEnquiry): Promise<Response> {
    const service = new EnquiryService();
    const res = await service.createProductEnquiry(request);
    return res;
  }

  @Get("/getAllProductsEnquiries")
  public async getAllProductsEnquiry(): Promise<IEnquiry[]> {
    const service = new EnquiryService();
    const res = await service.getAllProductsEnquiry();
    return res;
  }

}
