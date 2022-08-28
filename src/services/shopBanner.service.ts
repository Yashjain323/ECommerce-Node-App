import BannerModel from "../models/shopBanner.model";
import { ProductOfferService } from "./productOffer.service";

export class BannerService {
  constructor() {}

  public async getAllBanners() {
    const Banners = await BannerModel.find();
    return Banners;
  }

  public async getAllBannersByShopId(shopId: string) {
    const Banners = await BannerModel.find({shopId:shopId});
    return Banners;
  }

  public async getBannerById(id: string) {
    const Banner = await BannerModel.findById(id);
    if (!Banner) {
      return {
        error: true,
        message: "Shop Banner not found",
        result: null,
      };
    }
    return Banner;
  }

  // Creates an Address.
  public async createBanner(request: any) {
    const service = new ProductOfferService();
    const offerProducts = await service.getAllProductOffersByShopIds(request.body.shopIds);
    const Banner = new BannerModel({
      shopIds: request.body.shopIds,
      offerProducts : offerProducts,
      shopBanner: request.body.shopBanner
    });
    await Banner.save();
    return { error: false, message: "Shop Banner Creation Successful" };
  }

  // Updates an Address
  public async updateBanner(id: string, request: any) {
    let Banner = await BannerModel.findById(id);
    if (!Banner) {
      return {
        error: true,
        message: "Shop Banner not found",
        result: null,
      };
    }
    await BannerModel.findByIdAndUpdate(id,{$push:{shopBanner:request.body.shopBanner}});
    console.log({ message: "Shop Banner Updated" });
    return { error: false, message: "Shop Banner Updated" };
  }

  // Deletes an Address
  public async deleteBanner(id: string,request:any,delImage:boolean) {
    let Banner = await BannerModel.findById(id);
    let BannerDeleted;
    if (!Banner) {
      return {
        error: true,
        message: "Shop Banner not found",
        result: null,
      };
    }
    if(delImage === true) {
     BannerDeleted = await BannerModel.findByIdAndUpdate(id,{$pull:{shopBanner:{$in: request.body.shopBanner}}})
    }
    else  {
     BannerDeleted = await BannerModel.findByIdAndDelete(id);
    }
    return BannerDeleted;
  }
}
