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
import { ShopService } from "../services/shop.service";

interface Response {
  error: boolean;
  message: string;
}

interface IShop {
  name: string;
  email: string;
  shopImg: string;
  kartaName: string;
  aadharNo: number;
  panNo: string;
  gstNo: string;
  mobile: number;
  password: string;
  ratings: number;
  address: string;
  state: string;
  city: string;
  location : { 
  type: "Point",
  coordinates: number[]
}
  usersFollowing: string[];
  pincode: number;
}

interface IShopFollowers{
  usersFollowing: string[];
}
@Route("shop")
@Tags("Shop")
export default class ShopSwagger {
  @Post("/createShop")
  public async createShop(@Body() request: IShop): Promise<Response> {
    const service = new ShopService();
    const res = await service.createShop(request);
    return res;
  }

  @Get("/getShopById/:id")
  public async getShopById(id: string): Promise<IShop[]> {
    const service = new ShopService();
    const res = await service.getShopById(id);
    return res;
  }

  @Get("/getAllShops")
  public async getAllShops(): Promise<IShop[]> {
    const service = new ShopService();
    const res = await service.getAllShops();
    return res;
  }

  @Get("/getAllVerifiedShops")
  public async getAllVerifiedShops(): Promise<IShop[]> {
    const service = new ShopService();
    const res = await service.getAllVerifiedShops();
    return res;
  }

  @Get("/getAllBlockedShops")
  public async getAllBlockedShops(): Promise<IShop[]> {
    const service = new ShopService();
    const res = await service.getAllBlockedShops();
    return res;
  }

  @Put("/addFollowers/:id")
  public async addFollowers(
    id: string,
    @Body() request: IShopFollowers
  ): Promise<Response> {
    const service = new ShopService();
    const res = await service.addFollowers(id, request);
    return res;
  }

  @Put("/removeFollowers/:id")
  public async removeFollowers(
    id: string,
    @Body() request: IShopFollowers
  ): Promise<Response> {
    const service = new ShopService();
    const res = await service.removeFollowers(id, request);
    return res;
  }

  @Put("/updateShop/:id")
  public async updateShop(
    id: string,
    @Body() request: IShop
  ): Promise<Response> {
    const service = new ShopService();
    const res = await service.updateShop(id, request);
    return res;
  }

  @Put("/changeVerifiedStatus/:id")
  public async changeVerifiedStatus(id: string): Promise<Response> {
    const service = new ShopService();
    const res = await service.changeVerifiedStatus(id);
    return res;
  }

  @Put("/changeBlockedStatus/:id")
  public async changeBlockedStatus(id: string): Promise<Response> {
    const service = new ShopService();
    const res = await service.changeBlockedStatus(id);
    return res;
  }

  @Delete("/deleteShop/:id")
  public async deleteShop(id: string): Promise<any> {
    const service = new ShopService();
    const res = await service.deleteShop(id);
    return res;
  }
}
