import { Get, Post, Put, Delete, Route, Tags, Body } from "tsoa";
import { ProductOfferService } from "../services/productOffer.service";

interface Response {
  error: boolean;
  message: string;
}

interface IProductOffer {
    title: string, 
    shopId: string,
    desc: string,
    products: { proId: string, discount: number}[],
    shopBanner: string,
}

@Route("productOffer")
@Tags("Product Offer")
export default class ProductOfferSwagger {
  @Post("/create")
  public async createProductOffer(@Body() request: IProductOffer): Promise<Response> {
    const service = new ProductOfferService();
    const res = await service.createProductOffer(request);
    return res;
  }

  @Get("/getById/:id")
  public async getProductOfferById(id: string): Promise<IProductOffer[]> {
    const service = new ProductOfferService();
    const res = await service.getProductOfferById(id);
    return res;
  }

  @Get("/getAll")
  public async getAllProductOffers(): Promise<IProductOffer[]> {
    const service = new ProductOfferService();
    const res = await service.getAllProductOffers();
    return res;
  }

  @Get("/getAllProductOffersByShopId/:id")
  public async getAllProductOfferByShopId(id: string): Promise<IProductOffer[]> {
    const service = new ProductOfferService();
    const res = await service.getAllProductOffersByShopId(id);
    return res;
  }

  @Put("/update/:id")
  public async updateProductOffer(
    id: string,
    @Body() request: IProductOffer
  ): Promise<Response> {
    const service = new ProductOfferService();
    const res = await service.updateProductOffer(id, request);
    return res;
  }

  @Delete("/delete/:id")
  public async deleteProductOffer(id: string): Promise<any> {
    const service = new ProductOfferService();
    const res = await service.deleteProductOffer(id);
    return res;
  }
}
