import productModel from "../models/product.model";
import { UserService } from "./user.service";
import { ShopService } from "./shop.service";

export class ProductService {
  constructor() {}

  public async getAllProducts() {
    const products = await productModel.find();
    return products;
  }

  public async getAllProductsByShopId(shopId: string) {
    const products = await productModel.find({shopId:shopId});
    return products;
  }

  public async getProductsByChildCategoryId(childCategoryId: string) {
    const products = await productModel.find({childCategoryId:childCategoryId});
    return products;
  }

  public async usersLiking(id:string, request: any) {
    let pro = await productModel.findById(id);
    if (!pro) {
      return {
        error: true,
        message: "product not found",
        result: null,
      };
    }
    console.log(request.body.usersLiking);
    const shopService = new ShopService();
    const userService =new UserService();
    const shop = await shopService.getShopById(pro.shopId)
    const user = await userService.getUserById(request.body.usersLiking[0]);
    const payload = {
      "GCM":`{ \"notification\": { \"body\": \"${user.firstName} ${user.lastName} has liked the ${pro.name} of your shop\", \"title\":\"Your Product Has Been Liked\" } }`
    };
    await ShopService.publish(shop.snsEndpoint,payload)
    await productModel.findByIdAndUpdate(id,{$push:{usersLiking:request.body.usersLiking}});
    request.body.usersLiking.map(async (userId:any)=>{
      await userService.likedUser(userId,id)
    })
    console.log("Product Liked Successfully")
    return { error: false, message: "Product Liked Successfully" };
  }

  public async usersUnLiking(id:string, request: any) {
    let pro = await productModel.findById(id);
    if (!pro) {
      return {
        error: true,
        message: "product not found",
        result: null,
      };
    }
    console.log(request.body.usersLiking);
    await productModel.findByIdAndUpdate(id,{$pull:{usersLiking:{$in: request.body.usersLiking}}});
    const service = new UserService();
    request.body.usersLiking.map(async (userId:any)=>{
      await service.unLikedUser(userId,id)
    })
    console.log("Product Unliked Successfully")
    return { error: false, message: "Product Unliked Successfully" };
  }


  public async getProductById(id: string) {
    const product = await productModel.findById(id);
    if (!product) {
      return {
        error: true,
        message: "Shop not found",
        result: null,
      };
    }
    return product;
  }

  // Creates an Address.
  public async createProduct(request: any) {
    const product = new productModel({
      ...request.body,
    });
    await product.save();
    return { error: false, message: "Product Creation Successful" };
  }

  // Updates an Address
  public async updateProduct(id: string, request: any) {
    let product = await productModel.findById(id);
    if (!product) {
      return {
        error: true,
        message: "Product not found",
        result: null,
      };
    }
    let update = {
      ...request.body,
    };
    await productModel.findByIdAndUpdate(id,update);
    console.log({ message: "Product Updated" });
    return { error: false, message: "Product Updated" };
  }

  // Deletes an Address
  public async deleteProduct(id: string) {
    let product = await productModel.findById(id);
    if (!product) {
      return {
        error: true,
        message: "Product not found",
        result: null,
      };
    }
    let productDeleted = await productModel.deleteOne({ _id: id });
    return productDeleted;
  }
}
