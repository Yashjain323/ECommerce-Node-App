import ProductChildCategoryModel from "../models/productChildCategory.model";

export class ProductChildCategoryService {
  constructor() {}

  public async getAllProductChildCategory() {
    let ProductChildCategorys = await ProductChildCategoryModel.find({
      isDeleted: false,
    })
      .sort({ _id: 1 })
      .exec();
    return ProductChildCategorys;
  }

  public async getChildCategoriesBySubCategoryId(subCategoryId: string) {
    const childCategories = await ProductChildCategoryModel.find({subCategoryId:subCategoryId});
    return childCategories;
  }

  public async getAllVerifiedProductChildCategories() {
    let ProductChildCategories = await ProductChildCategoryModel.find({
      isDeleted: false,
      isStatus: true
    })
      .sort({ _id: 1 })
      .exec();
    return ProductChildCategories;
  }

  // Creates A ProductChildCategory.
  public async createProductChildCategory(request:any) {
    let productChildCategory = await ProductChildCategoryModel.findOne({
      name: request.body.name,
    });

    // If we find a product category with similar name there are two possible scenarios
    if (productChildCategory) {
      // 1. It is present in our DB and is being used
      if (
        productChildCategory.isDeleted === false &&
        productChildCategory.subCategoryId === request.body.subCategoryId
      ) {
        return {
          error: true,
          message: "Product Category with same Name already exists",
        };
      }
      // 2. It is present in our DB but it was deleted earlier so now we will update this.
      else {
        productChildCategory.overwrite({
          ...request.body,
          createdOn: new Date().getTime(),
          isDeleted: false,
        });
        await productChildCategory.save();
        return {
          error: false,
          message: "Product Category Creation Successful",
        };
      }
    }
    const ProductChildCategory = new ProductChildCategoryModel({
      ...request.body,
    });
    await ProductChildCategory.save();
    return {
      error: false,
      message: "Product Child Category Creation Successful",
    };
  }

  public async getProductChildCategory(id: string) {
    let productChildCategory = await ProductChildCategoryModel.findById(id);
    if (!productChildCategory || productChildCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product Child Category not found",
        result: null,
      };
    }
    return productChildCategory;
  }

  // Updates a ProductChildCategory.
  public async updateProductChildCategory(id: string, request:any) {
    let productChildCategory = await ProductChildCategoryModel.findById(id);
    if (!productChildCategory || productChildCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product Child Category not found",
        result: null,
      };
    }
    productChildCategory = await ProductChildCategoryModel.findOne({
      name: request.body.name,
    });
    if (
      productChildCategory &&
      productChildCategory.isDeleted === false &&
      productChildCategory.categoryId === request.body.categoryId &&
      productChildCategory.subCategoryId === request.body.subCategoryId
    )
      return {
        error: true,
        message: "ProductChildCategory with same Name already exists",
      };
    let update = {
      ...request.body,
      createdOn: new Date().getTime(),
      isDeleted: false,
    };
    await ProductChildCategoryModel.findByIdAndUpdate(id, update);
    console.log({ message: "Product ChildCategory Updated" });
    return { error: false, message: "Product ChildCategory Updated" };
  }

  public async verifyProductChildCategory(id: string) {
    let productChildCategory = await ProductChildCategoryModel.findById(id);
    if (!productChildCategory || productChildCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product Child Category not found",
        result: null,
      };
    }
    let update = {
      isStatus: true,
    };
    await ProductChildCategoryModel.findByIdAndUpdate(id, update);
    console.log({ message: "Product Child Category Verified" });
    return { error: false, message: "Product Child Category Verified" };
  }

  // Deletes a Product Child Category
  public async deleteProductChildCategory(id: string) {
    let productChildCategory = await ProductChildCategoryModel.findById(id);
    if (!productChildCategory || productChildCategory.isDeleted === true) {
      return {
        error: true,
        message: "Product Child Category not found",
        result: null,
      };
    }
    let productChildCategoryDelete =
      await ProductChildCategoryModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });
    return productChildCategoryDelete;
  }
}
