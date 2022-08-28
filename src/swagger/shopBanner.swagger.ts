import { Get, Post, Put, Delete, Route, Tags, Body, Query } from "tsoa";
import { BannerService } from "../services/shopBanner.service";

interface Response {
  error: boolean;
  message: string;
}

interface IBanner {
  shopIds: string[];
  shopBanner: string;
}

@Route("banner")
@Tags("Shop Banners")
export default class BannerSwagger {
  @Post("/create")
  public async createBanner(@Body() request: IBanner): Promise<Response> {
    const service = new BannerService();
    const res = await service.createBanner(request);
    return res;
  }

  @Get("/getById/:id")
  public async getBannerById(id: string): Promise<IBanner[]> {
    const service = new BannerService();
    const res = await service.getBannerById(id);
    return res;
  }

  @Get("/getAll")
  public async getAllBanners(): Promise<IBanner[]> {
    const service = new BannerService();
    const res = await service.getAllBanners();
    return res;
  }

  @Get("/getAllBannersByShopId/:id")
  public async getAllBannersByShopId(id: string): Promise<IBanner[]> {
    const service = new BannerService();
    const res = await service.getAllBannersByShopId(id);
    return res;
  }

  @Put("/update/:id")
  public async updateBanner(
    id: string,
    @Body() request: IBanner
  ): Promise<Response> {
    const service = new BannerService();
    const res = await service.updateBanner(id, request);
    return res;
  }

  @Delete("/delete/:id")
  public async deleteBanner(
    id: string, 
    @Query() delImage: boolean, 
    @Body() request:IBanner
    ): Promise<Response> {
    const service = new BannerService();
    const res = await service.deleteBanner(id,request,delImage);
    return res;
  }

  @Delete("/deleteImages/:id")
  public async deleteBannerImages(id: string, 
    @Query() delImage:boolean, 
    @Body() request:IBanner): Promise<any> {
    const service = new BannerService();
    const res = await service.deleteBanner(id,request,delImage);
    return res;
  }
}
