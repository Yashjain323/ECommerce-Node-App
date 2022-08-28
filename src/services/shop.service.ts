import shopModel from "../models/shop.model";
import productModel from "../models/product.model"
import {ProductService} from "./product.service";
import {UserService} from "./user.service";
const AWS = require("aws-sdk");
const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
const sns = new AWS.SNS({ credentials: credentials, region: "ap-south-1" });
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
    var payload = {
      "GCM":"{ \"notification\": { \"body\": \"A new shop has been onboarded\", \"title\":\"New Shop Update\" } }"
    };
    await shop.save();
    const userClass = new UserService();
    const users = await userClass.getAllUsers();
    await Promise.all(users.map(async(user)=>{
      if(user.snsEnpoint!=="")
        {
          await ShopService.publish(user.snsEndpoint,payload)
        }
    }));
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
    const service = new UserService();
    const user = await service.getUserById(request.body.usersFollowing[0])
    var payload = {
      "GCM":`{ \"notification\": { \"body\": \"${user.firstName} ${user.lastName} has followed your shop\", \"title\":\"Your Shop Has Been Followed\" } }`
    };
    await shopModel.findByIdAndUpdate(id,{$push:{usersFollowing:request.body.usersFollowing}});
    request.body.usersFollowing.map(async (userId:any)=>{
      await service.addUsers(userId,id)
    })
    await ShopService.publish(shop.snsEndpoint,payload)
    console.log("Followers Added Successfully")
    return { error: false, message: "Follower Added Successfully" };
  }

  public async removeFollowers(id:string, request: any) {
    let shop = await shopModel.findById(id);
    if (!shop) {
      return {
        error: true,
        message: "Shop not found",
        result: null,
      };
    }
    console.log(request.body.usersFollowing);
    await shopModel.findByIdAndUpdate(id,{$pull:{usersFollowing:{$in: request.body.usersFollowing}}});
    const service = new UserService();
    request.body.usersFollowing.map(async (userId:any)=>{
      await service.removeUsers(userId,id)
    })
    console.log("Followers Removed Successfully")
    return { error: false, message: "Follower Removed Successfully" };
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

  public static publish(arn:any,payload:{}) {
    console.log("Sending push on endpoints");
    sns.publish(
      {
        // TargetArn:"arn:aws:sns:ap-south-1:876260917974:endpoint/GCM/Litchies_Notifications/721e2623-e294-3b12-ae8d-bb2c8fabe3e7", // Required
        TargetArn:arn,
        MessageStructure: 'json',
        Message: JSON.stringify(payload) // Required
      },
      (err: any, data: any)=>{
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
      }
    );
  } 
}
