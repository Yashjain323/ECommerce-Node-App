import {
  Get,Post,Put,Delete,Route,Tags,Body,Security,Query,
} from "tsoa";
import { ProductSubCategoryService } from "../services/productSubCategory.service";

interface Response {
  error: boolean;
  message: string;
}
// 1. Create multiple interfaces representing a document in MongoDB.
interface IProductSubCategory {
  categoryId: string;
  name: string;
 }

@Route("productSubCategory")
@Tags("Product SubCategories")
export default class ProductSubCategorySwagger {

  // @Security("jwt")
  @Post("/create")
  public async createProductSubCategory(
    @Body() request: IProductSubCategory
  ): Promise<Response> {
    const service = new ProductSubCategoryService();
    const res = await service.createProductSubCategory(request);
    return res;
  }

  @Get("/getById/:id")
  public async getProductSubCategory(
    id: string,
    ): Promise<IProductSubCategory[]> {
    const service = new ProductSubCategoryService();
    const res = await service.getProductSubCategory(id);
    return res;
  }

  // @Security("jwt")
  @Get("/getAll")
  public async getAllProductSubCategory(): Promise<any> {
    const service = new ProductSubCategoryService();
    const res = await service.getAllProductSubCategory();
    return res;
  }

  @Get("/getSubCategoriesByProductCategory/:id")
  public async getSubCategoriesByProductCategory(id:string): Promise<IProductSubCategory[]> {
    const service = new ProductSubCategoryService();
    const res = await service.getSubCategoriesByProductCategory(id);
    return res;
  }

  @Get("/getAllVerified")
  public async getAllVerifiedProductSubCategories(): Promise<IProductSubCategory[]> {
    const service = new ProductSubCategoryService();
    const res = await service.getAllVerifiedProductSubCategories();
    return res;
  }

  // @Security("jwt")
  @Put("/update/:id")
  public async updateProductSubCategory(
    id: string,
    @Body() request: IProductSubCategory
  ): Promise<Response> {
    const service = new ProductSubCategoryService();
    const res = await service.updateProductSubCategory(id, request);
    return res;
  }

  @Put("/changeStatus/:id")
  public async verifyProductSubCategory(
    id: string,
  ): Promise<Response> {
    const service = new ProductSubCategoryService();
    const res = await service.verifyProductSubCategory(id);
    return res;
  }

  // @Security("jwt")
  @Delete("/delete/:id")
  public async deleteProductSubCategory(id: string): Promise<IProductSubCategory> {
    const service = new ProductSubCategoryService();
    const res = await service.deleteProductSubCategory(id);
    return res;
  }
}
