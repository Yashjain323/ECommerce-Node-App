import {
    Get,
    Post,
    Put,
    Delete,
    Route,
    Tags,
    Body,
    Security,
    Query,
  } from "tsoa";
  import { ProductChildCategoryService } from "../services/productChildCategory.service";
  
  interface Response {
    error: boolean;
    message: string;
  }
  // 1. Create multiple interfaces representing a document in MongoDB.
interface IProductChildCategory {
  subCategoryId: string;
  //categoryId:string;
  name: string;
}
  
  @Route("productChildCategory")
  @Tags("Product Child Categories")
  export default class ProductChildCategorySwagger {
  
    // @Security("jwt")
    @Post("/create")
    public async createProductChildCategory(
      @Body() request: IProductChildCategory
    ): Promise<Response> {
      const service = new ProductChildCategoryService();
      const res = await service.createProductChildCategory(request);
      return res;
    }

    // @Security("jwt")
    @Get("/getById/:id")
    public async getProductChildCategory(
      id: string,
      ): Promise<IProductChildCategory[]> {
      const service = new ProductChildCategoryService();
      const res = await service.getProductChildCategory(id);
      return res;
    }
    @Get("/getChildCategoriesBySubCategory/:id")
    public async getChildCategoriesBySubCategory(id: string): Promise<IProductChildCategory[]> {
      const service = new ProductChildCategoryService();
      const res = await service.getChildCategoriesBySubCategoryId(id);
      return res;
    }
  
    // @Security("jwt")
    @Get("/getAll")
    public async getAllProductChildCategory(): Promise<IProductChildCategory[]> {
      const service = new ProductChildCategoryService();
      const res = await service.getAllProductChildCategory();
      return res;
    }

    @Get("/getAllVerified")
    public async getAllVerifiedProductChildCategories(): Promise<IProductChildCategory[]> {
      const service = new ProductChildCategoryService();
      const res = await service.getAllVerifiedProductChildCategories();
      return res;
    }

    // @Security("jwt")
    @Put("/update/:id")
    public async updateProductChildCategory(
      id: string,
      @Body() request: IProductChildCategory
    ): Promise<Response> {
      const service = new ProductChildCategoryService();
      const res = await service.updateProductChildCategory(id, request);
      return res;
    }

    @Put("/changeStatus/:id")
    public async verifyProductChildCategory(
    id: string,
    ): Promise<Response> {
    const service = new ProductChildCategoryService();
    const res = await service.verifyProductChildCategory(id);
    return res;
    }
  
    // @Security("jwt")
    @Delete("/delete/:id")
    public async deleteProductChildCategory(id: string): Promise<IProductChildCategory> {
      const service = new ProductChildCategoryService();
      const res = await service.deleteProductChildCategory(id);
      return res;
    }
  }
  