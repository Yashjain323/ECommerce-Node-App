import ProductCategoryModel from "../models/productCategory.model";

export class ProductCategoryService {
  constructor() {}

  public async getAllProductCategory() {
    let ProductCategories = await ProductCategoryModel.find({
      isDeleted: false,
    })
      .select("-isDeleted")
      .sort({ _id: 1 })
      .exec();
    return ProductCategories;
  }

  public async getAllVerifiedProductCategories() {
    let ProductCategories = await ProductCategoryModel.find({
      isDeleted: false, isStatus: true
    })
      .sort({ _id: 1 })
      .exec();
    return ProductCategories;
  }

  public async getProductCategory(id: string) {
    let productCategory = await ProductCategoryModel.findById(id);
    if (!productCategory || productCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product Category not found",
        result: null,
      };
    }
    return productCategory;
  }

  // Creates A ProductCategory.
  public async createProductCategory(request:any) {
    let productCategory = await ProductCategoryModel.findOne({
      name: request.body.name,
    });

    // If we find a product category with similar name there are two possible scenarios
    if (productCategory) {
      // 1. It is present in our DB and is being used
      if (productCategory.isDeleted === false) {
        return {
          error: true,
          message: "Product Category with same Name already exists",
        };
      } 
      // 2. It is present in our DB but it was deleted earlier so now we will update this.
      else {
        productCategory.overwrite({
          ...request.body,
          createdOn: new Date().getTime(),
          isDeleted: false,
        });
        await productCategory.save();
        return {
          error: false,
          message: "Product Category Creation Successful",
        };
      }
    }
    const ProductCategory = new ProductCategoryModel({
      ...request.body,
    });
    await ProductCategory.save();
    return { error: false, message: "Product Category Creation Successful" };
  }


  // public async getAllCategoriesByShopId(shopId: string) {
  //   const category = await ProductCategoryModel.find({shopId:shopId});
  //   return category;
  // }

  // Updates a ProductCategory
  public async updateProductCategory(id: string, request:any) {
    let productCategory = await ProductCategoryModel.findById(id);
    if (!productCategory || productCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product Category not found",
        result: null,
      };
    }
    productCategory = await ProductCategoryModel.findOne({
      name: request.body.name,
    });
    if (productCategory && productCategory.isDeleted === false)
      return {
        error: true,
        message: "ProductCategory with same Name already exists",
      };
    let update = {
      ...request.body,
      createdOn: new Date().getTime(),
      isDeleted: false,
    };
    await ProductCategoryModel.findByIdAndUpdate(id, update);
    console.log({ message: "Product Category Updated" });
    return { error: false, message: "Product Category Updated" };
  }

  public async verifyProductCategory(id: string) {
    let productCategory = await ProductCategoryModel.findById(id);
    if (!productCategory || productCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product Category not found",
        result: null,
      };
    }
    let update = {
      isStatus: true,
    };
    await ProductCategoryModel.findByIdAndUpdate(id, update);
    console.log({ message: "Product Category Verified" });
    return { error: false, message: "Product Category Verified" };
  }

  // Deletes a Product Category
  public async deleteProductCategory(id: string) {
    let productCategory = await ProductCategoryModel.findById(id);
    if (!productCategory || productCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product Category not found",
        result: null,
      };
    }
    let productCategoryDelete = await ProductCategoryModel.findByIdAndUpdate(
      id,
      { isDeleted: true }
    );
    return productCategoryDelete;
  }
}
