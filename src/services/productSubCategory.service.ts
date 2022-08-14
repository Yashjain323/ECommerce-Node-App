import ProductSubCategoryModel from "../models/productSubCategory.model";

export class ProductSubCategoryService {
  constructor() {}

  public async getAllProductSubCategory() {
    let ProductSubCategorys = await ProductSubCategoryModel.find({
      isDeleted: false,
    })
      // .populate({ "path": "categoryId", "select": "name" })
      .select("-isDeleted")
      .sort({ _id: 1 })
      .exec();
    return ProductSubCategorys;
  }

  public async getSubCategoriesByProductCategory(productCategoryId: string) {
    const subCategories = await ProductSubCategoryModel.find({categoryId:productCategoryId});
    return subCategories;
  }

  public async getAllVerifiedProductSubCategories() {
    let ProductSubCategories = await ProductSubCategoryModel.find({
      isDeleted: false,
      isStatus: true
    })
      // .populate({ "path": "categoryId", "select": "name" })
      .select("-isDeleted")
      .sort({ _id: 1 })
      .exec();
    return ProductSubCategories;
  }

  public async getProductSubCategory(id: string) {
    let productSubCategory = await ProductSubCategoryModel.findById(id);
    if (productSubCategory && productSubCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product SubCategory not found",
        result: null,
      };
    }
    return productSubCategory;
  }

  // Creates A Prouduct SubCategory
  public async createProductSubCategory(request:any) {
    let productSubCategory = await ProductSubCategoryModel.findOne({
      name: request.body.name,
    });

    // If we find a product subCategory with similar name there are two possible scenarios
    if (productSubCategory) {
      // 1. It is present in our DB and is being used
      if (
        productSubCategory.isDeleted === false &&
        productSubCategory.categoryId === request.body.categoryId
      ) {
        return {
          error: true,
          message: "Product Category with same name already exists",
        };
      }
      // 2. It is present in our DB but it was deleted earlier so now we will update this.
      else {
        productSubCategory.overwrite({
          ...request.body,
          createdOn: new Date().getTime(),
          isDeleted: false,
        });
        await productSubCategory.save();
        return {
          error: false,
          message: "Product Category Creation Successful",
        };
      }
    }
    const ProductSubCategory = new ProductSubCategoryModel({
      ...request.body,
    });
    await ProductSubCategory.save();
    return { error: false, message: "Product Subcategory Creation Successful" };
  }

  // Updates a Product SubCategory
  public async updateProductSubCategory(id: string, request:any) {
    let productSubCategory = await ProductSubCategoryModel.findById(id);
    if (!productSubCategory || productSubCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product SubCategory not found",
        result: null,
      };
    }
    productSubCategory = await ProductSubCategoryModel.findOne({
      name: request.body.name,
    });
    if (
      productSubCategory &&
      productSubCategory.isDeleted === false &&
      productSubCategory.categoryId === request.body.categoryId
    )
      return {
        error: true,
        message: "ProductSubCategory with same name already exists",
      };
    let update = {
      ...request.body,
      createdOn: new Date().getTime(),
      isDeleted: false,
    };
    await ProductSubCategoryModel.findByIdAndUpdate(id, update);
    console.log({ message: "Product SubCategory Updated" });
    return { error: false, message: "Product SubCategory Updated" };
  }

  public async verifyProductSubCategory(id: string) {
    let productSubCategory = await ProductSubCategoryModel.findById(id);
    if (!productSubCategory || productSubCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product Sub Category not found",
        result: null,
      };
    }
    let update = {
      isStatus: true,
    };
    await ProductSubCategoryModel.findByIdAndUpdate(id, update);
    console.log({ message: "Product Sub Category Verified" });
    return { error: false, message: "Product Sub Category Verified" };
  }

  // Deletes a Product SubCategory
  public async deleteProductSubCategory(id: string) {
    let productSubCategory = await ProductSubCategoryModel.findById(id);
    if (!productSubCategory || productSubCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product SubCategory not found",
        result: null,
      };
    }
    let productSubCategoryDelete =
      await ProductSubCategoryModel.findByIdAndUpdate(id, { isDeleted: true });
    return productSubCategoryDelete;
  }
}
