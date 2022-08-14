import shopModel from "../models/shop.model";
import productModel from "../models/product.model"
import {ProductService} from "./product.service";
import {UserService} from "./user.service";
export class ShopService {
  constructor() {}

  public async getAllShops() {
    const shops = await shopModel.find({isBlocked:false,isVerified:false});
    return shops;
  }

  public async getAllVerifiedShops() {
    const shops = await shopModel.find({isVerified:true});
    return shops;
  }

  public async getAllBlockedShops() {
    const shops = await shopModel.find({isBlocked:true});
    return shops;
  }
  
  public async getShopById(id: string) {
    const shop = await shopModel.findById(id);
    if (!shop) {
      return {
        error: true,
        message: "Shop not found",
        result: null,
      };
    }
    return shop;
  }

  // Creates an Address.
  public async createShop(request: any) {
    const shop = new shopModel({
      ...request.body,
    });
    await shop.save();
    return { error: false, message: "Shop Creation Successful" };
  }

  public async addFollowers(id:string, request: any) {
    let shop = await shopModel.findById(id);
    if (!shop) {
      return {
        error: true,
        message: "Shop not found",
        result: null,
      };
    }
    console.log(request.body.usersFollowing);
    await shopModel.findByIdAndUpdate(id,{$push:{usersFollowing:request.body.usersFollowing}});
    const service = new UserService();
    request.body.usersFollowing.map(async (userId:any)=>{
      await service.addUsers(userId,id)
    })
    console.log("Followers Added Successfully")
    return { error: false, message: "Follower Added Successfully" };
  }

  // Updates an Address
  public async updateShop(id: string, request: any) {
    let shop = await shopModel.findById(id);
    if (!shop) {
      return {
        error: true,
        message: "Shop not found",
        result: null,
      };
    }
    let update = {
      ...request.body,
    };
    await shopModel.findByIdAndUpdate(id, update);
    console.log({ message: "Shop Updated" });
    return { error: false, message: "Shop Updated" };
  }

  public async changeVerifiedStatus(id: string) {
    let shop = await shopModel.findById(id);
    if (!shop) {
      return {
        error: true,
        message: "Shop not found",
        result: null,
      };
    }
    await shopModel.findByIdAndUpdate(id, { isVerified:true});
    console.log({ message: "Shop Updated" });
    return { error: false, message: "Shop Updated" };
  }

  public async changeBlockedStatus(id: string) {
    let shop = await shopModel.findById(id);
    if (!shop) {
      return {
        error: true,
        message: "Shop not found",
        result: null,
      };
    }
    await shopModel.findByIdAndUpdate(id, { isBlocked:true });
    console.log({ message: "Shop Updated" });
    return { error: false, message: "Shop Updated" };
  }

  // Deletes an Address
  public async deleteShop(id: string) {
    let shop = await shopModel.findById(id);
    if (!shop) {
      return {
        error: true,
        message: "Shop not found",
        result: null,
      };
    }
    const service = new ProductService();
    let shopProducts:{}[] = await service.getAllProductsByShopId(id);
    let shopDeleted = await shopModel.deleteOne({ _id: id });
    this.deleteProds(shopProducts);
    return shopDeleted;
  }

  public deleteProds(shopProducts:{}[]) {
    shopProducts.map(async(product:any)=>{
      console.log(product);
      await productModel.deleteOne({_id:product._id})
    })
  }
}
