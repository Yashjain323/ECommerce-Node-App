import {
  Get,Post,Put,Delete,Route,Tags,Body,Security,Query,
} from "tsoa";
import { ProductCategoryService } from "../services/productCategory.service";

interface Response {
  error: boolean;
  message: string;
}

// 1. Create multiple interfaces representing a document in MongoDB.
interface IProductCategory {
  name: string
}

@Route("productCategory")
@Tags("Product Categories")
export default class ProductCategorySwagger {

  // @Security("jwt")
  @Post("/create")
  public async createProductCategory(
    @Body() request: IProductCategory
  ): Promise<Response> {
    const service = new ProductCategoryService();
    const res = await service.createProductCategory(request);
    return res;
  }

  @Get("/getById/:id")
    public async getProductCategory(
      id: string,
      ): Promise<IProductCategory[]> {
      const service = new ProductCategoryService();
      const res = await service.getProductCategory(id);
      return res;
    }

  // @Security("jwt")
  @Get("/getAll")
  public async getAllProductCategory(): Promise<IProductCategory[]> {
    const service = new ProductCategoryService();
    const res = await service.getAllProductCategory();
    return res;
  }

  @Get("/getAllVerified")
  public async getAllVerifiedProductCategories(): Promise<IProductCategory[]> {
    const service = new ProductCategoryService();
    const res = await service.getAllVerifiedProductCategories();
    return res;
  }

  // @Security("jwt")
  @Put("/update/:id")
  public async updateProductCategory(
    id: string,
    @Body() request: IProductCategory
  ): Promise<Response> {
    const service = new ProductCategoryService();
    const res = await service.updateProductCategory(id, request);
    return res;
  }

  @Put("/changeStatus/:id")
  public async verifyProductCategory(
    id: string,
  ): Promise<Response> {
    const service = new ProductCategoryService();
    const res = await service.verifyProductCategory(id);
    return res;
  }

  // @Security("jwt")
  @Delete("/delete/:id")
  public async deleteProductCategory(id: string): Promise<IProductCategory> {
    const service = new ProductCategoryService();
    const res = await service.deleteProductCategory(id);
    return res;
  }
}
