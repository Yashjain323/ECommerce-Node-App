import EnquiryModel from "../models/enquiry.model";

export class EnquiryService {
  constructor() {}

  public async getAllProductsEnquiry() {
    const Enquiry = await EnquiryModel.find();
    return Enquiry;
  }

  // Creates an Enquiry.
  public async createProductEnquiry(request: any) {
    const Enquiry = new EnquiryModel({
      ...request.body,
    });
    await Enquiry.save();
    return { error: false, message: "Product Enquiry Creation Successful" };
  }
}
