import userModel from "../models/user.model";
import {UserService} from "../services/user.service"
const otpGenerator = require('otp-generator')

export class LoginService {
  constructor() {}

  public async login(request: any) {
    const user = await userModel.findOne({mobile: request.body.mobile});
    if(!user) return {error: true, message:"Please check your Mobile Number!"}
     if(user.password == request.body.password) {
        console.log(user);
        return { error: false, message: "SignIn Successfully Executed" ,id:user.id};
    }
    else  return { error: true, message: "Password Incorrect" };
    }

    public async forgot(request: any) {
      const user = await userModel.findOne({mobile: request.body.mobile});
      if(!user) return {error: true, message:"The mobile you entered is not registered"}
      await new UserService().updateUserPassword(user._id,request); 
      return { error: false, message: "Password Changed Successfully" ,id:user.id};
      }
}