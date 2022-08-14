import userModel from "../models/user.model";
const otpGenerator = require('otp-generator')
import message from "./../message";

export class UserService {
  constructor() {}

  public async getAllUsers() {
    const users = await userModel.find();
    return users;
  }

  public async getUserById(id: string) {
    const user = await userModel.findById(id);
    if (!user) {
      return {
        error: true,
        message: "User not found",
        result: null,
      };
    }
    return user;
  }

  public async createUser(request: any) {
    const user = new userModel({
      ...request.body,
    });
    await user.save();
    return { error: false, message: "User Creation Successful" };
  }

  public async createOtp(request: any) {
    const checkUser = await userModel.findOne({mobile:request.body.mobile});
    if(checkUser) {
      return {error:true,message:"Phone No. Already Exists"};
    }
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false })
    await message(request.body.mobile,otp);
    return { error: false, message: "OTP sent successfully", otp:otp };
  }

  public async createForgotOtp(request:any) {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false })
    await message(request.body.mobile,otp);
    return { error: false, message: "OTP sent successfully", otp:otp };
  }

  public async updateUserPassword(id: string, request: any) {
    let user = await userModel.findById(id);
    if (!user) {
      return {
        error: true,
        message: "User not found",
        result: null,
      };
    }
    let update = {
      password : request.body.password,
    };
    await userModel.findByIdAndUpdate(id,update);
    console.log({ message: "User Updated" });
    return { error: false, message: "user Updated" };
  }

  public async updateUser(id: string, request: any) {
    let user = await userModel.findById(id);
    if (!user) {
      return {
        error: true,
        message: "User not found",
        result: null,
      };
    }
    let update = {
      ...request.body,
    };
    await userModel.findByIdAndUpdate(id,update);
    console.log({ message: "User Updated" });
    return { error: false, message: "user Updated" };
  }

  public async addUsers(id: string, shopId: any) {
    let user = await userModel.findById(id);
    if (!user) {
      return {
        error: true,
        message: "User not found",
        result: null,
      };
    }
    await userModel.findByIdAndUpdate(id,{$push:{followedShops:shopId}});
    console.log({ message: "Shop Added to Followed List" });
    return { error: false, message: "Shop Added to Followed List" };
  }
  public async likedUser(id: string, productId: any) {
    let user = await userModel.findById(id);
    if (!user) {
      return {
        error: true,
        message: "User not found",
        result: null,
      };
    }
    await userModel.findByIdAndUpdate(id,{$push:{likedProducts:productId}});
    console.log({ message: "Product Added to Liked Product List" });
    return { error: false, message: "Product Added to Liked Product List" };
  }


  public async deleteUser(id: string) {
    let user = await userModel.findById(id);
    if (!user) {
      return {
        error: true,
        message: "User not found",
        result: null,
      };
    }
    let userDeleted = await userModel.deleteOne({ _id: id });
    return userDeleted;
  }
}
