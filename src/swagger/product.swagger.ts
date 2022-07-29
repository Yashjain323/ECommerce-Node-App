import {
  Get,
  Post,
  Put,
  Delete,
  Route,
  Tags,
  Body,
} from "tsoa";
import { ProductService } from "../services/product.service";

interface Response {
  error: boolean;
  message: string;
}

interface IProduct {
  name: string;
  shopId: string;
  category: string;
  desc: string;
  price: number;
  discount: number;
  imageURLs: string[];
}

@Route("product")
@Tags("Product")
export default class ProductSwagger {
  @Post("/createProduct")
  public async createProduct(@Body() request: IProduct): Promise<Response> {
    const service = new ProductService();
    const res = await service.createProduct(request);
    return res;
  }

  @Get("/getProduct/:id")
  public async getProductById(id: string): Promise<IProduct[]> {
    const service = new ProductService();
    const res = await service.getProductById(id);
    return res;
  }

  @Get("/getAllProducts")
  public async getAllProducts(): Promise<IProduct[]> {
    const service = new ProductService();
    const res = await service.getAllProducts();
    return res;
  }

  @Get("/getAllProductsByShopId/:id")
  public async getAllProductsByShopId(id:string): Promise<IProduct[]> {
    const service = new ProductService();
    const res = await service.getAllProductsByShopId(id);
    return res;
  }

  @Put("/updateProduct/:id")
  public async updateProduct(
    id: string,
    @Body() request: IProduct
  ): Promise<Response> {
    const service = new ProductService();
    const res = await service.updateProduct(id, request);
    return res;
  }

  @Delete("/deleteProduct/:id")
  public async deleteProduct(id: string): Promise<any> {
    const service = new ProductService();
    const res = await service.deleteProduct(id);
    return res;
  }
}
