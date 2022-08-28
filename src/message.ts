var unirest = require("unirest");
const dotenv = require("dotenv");
dotenv.config();

export default function message(mobile:number,otp:number,forgot:boolean) {
var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
req.headers({
  "authorization": process.env.fast2SmsAuthKey
});
let message:string;
if(forgot === false) message = `Your verification OTP for Litchies SignUP is: \n ${otp}`
else message = `OTP for Forgot Password is: \n ${otp}`
req.form({
  "route" : "v3",
  "sender_id" : "FTWSMS",
  "message" : message,
    "numbers": mobile
});

req.end(function (res:any) {
  if (res.error) {
    console.log(res.error);
    throw new Error(res.error);
  }

  console.log(res.body);
});
}