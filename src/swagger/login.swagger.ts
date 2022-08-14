import {
    Get,
    Post,
    Put,
    Delete,
    Route,
    Tags,
    Body,
  } from "tsoa";
  import { LoginService } from "../services/login.service";
  
  interface Response {
    error: boolean;
    message: string;
  }
  
  interface ILogin {
  mobile: number,
  password: string,
  }
 
  @Route("login")
  @Tags("Login")
  export default class UserSwagger {
    @Post("/")
    public async login(@Body() request: ILogin): Promise<Response> {
      const service = new LoginService();
      const res = await service.login(request);
      return res;
    }

    @Put("/forgot")
    public async forgot(@Body() request: ILogin): Promise<Response> {
      const service = new LoginService();
      const res = await service.forgot(request);
      return res;
    }
}