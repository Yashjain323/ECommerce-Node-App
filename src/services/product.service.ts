import productModel from "../models/product.model";

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
