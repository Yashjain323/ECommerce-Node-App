import {
    Get,
    Post,
    Put,
    Delete,
    Route,
    Tags,
    Body,
  } from "tsoa";
  import { UserService } from "../services/user.service";
  
  interface Response {
    error: boolean;
    message: string;
  }
  
  interface IUser {
    firstName: string,
  lastName: string,
  gender: string,
  dob: Date,
  email: string
  mobile: number,
  password: string,
  imageUrl: string
  }
  
  @Route("user")
  @Tags("User")
  export default class UserSwagger {
    @Post("/createUser")
    public async createUser(@Body() request: IUser): Promise<Response> {
      const service = new UserService();
      const res = await service.createUser(request);
      return res;
    }
  
    @Get("/getUser/:id")
    public async getUserById(id: string): Promise<IUser[]> {
      const service = new UserService();
      const res = await service.getUserById(id);
      return res;
    }
  
    @Get("/getAllUsers")
    public async getAllUsers(): Promise<IUser[]> {
      const service = new UserService();
      const res = await service.getAllUsers();
      return res;
    }
  
  
    @Put("/updateUser/:id")
    public async updateUser(
      id: string,
      @Body() request: IUser
    ): Promise<Response> {
      const service = new UserService();
      const res = await service.updateUser(id, request);
      return res;
    }
  
    @Delete("/deleteUser/:id")
    public async deleteUser(id: string): Promise<any> {
      const service = new UserService();
      const res = await service.deleteUser(id);
      return res;
    }
  }
  