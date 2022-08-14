import proOfferModel from "../models/proOffer.model";

export class ProductOfferService {
  constructor() {}

  public async getAllProductOffers() {
    const productOffers = await proOfferModel.find();
    return productOffers;
  }

  public async getAllProductOffersByShopId(shopId: string) {
    const productOffer = await proOfferModel.find({shopId:shopId});
    return productOffer;
  }

  public async getProductOfferById(id: string) {
    const productOffer = await proOfferModel.findById(id);
    if (!productOffer) {
      return {
        error: true,
        message: "Shop not found",
        result: null,
      };
    }
    return productOffer;
  }

  // Creates an Address.
  public async createProductOffer(request: any) {
    const productOffer = new proOfferModel({
      ...request.body,
    });
    await productOffer.save();
    return { error: false, message: "Product Creation Successful" };
  }

  // Updates an Address
  public async updateProductOffer(id: string, request: any) {
    let productOffer = await proOfferModel.findById(id);
    if (!productOffer) {
      return {
        error: true,
        message: "Product not found",
        result: null,
      };
    }
    let update = {
      ...request.body,
    };
    await proOfferModel.findByIdAndUpdate(id,update);
    console.log({ message: "Product Updated" });
    return { error: false, message: "Product Updated" };
  }

  // Deletes an Address
  public async deleteProductOffer(id: string) {
    let productOffer = await proOfferModel.findById(id);
    if (!productOffer) {
      return {
        error: true,
        message: "Product not found",
        result: null,
      };
    }
    let productDeleted = await proOfferModel.deleteOne({ _id: id });
    return productDeleted;
  }
}
