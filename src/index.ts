import express from "express";
import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const bucketName = process.env.bucketName || ""
const region = process.env.awsRegion
const S3 = require('aws-sdk/clients/s3')
const accessKeyId = process.env.awsAccessKey
const secretAccessKey = process.env.awsSecretAccessKey
const multerS3 = require('multer-s3')
const port = process.env.PORT;
const dbUrl = process.env.dbProductionUrl || "";
const app: express.Application = express();
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})
import {SmartStream} from "./smartStream";
import ShopController from "./controllers/shop.controller";
import swaggerUi from "swagger-ui-express";
import ProductController from "./controllers/product.controller";
import { UserService } from "./services/user.service";
import ProductOfferController from "./controllers/proOffer.controller";
import ProductCategoryController from "./controllers/productCategory.controller";
import ProductSubCategoryController from "./controllers/productSubCategory.controller";
import ProductChildCategoryController from "./controllers/productChildCategory.controller";
import UserController from "./controllers/user.controller";
import LoginController from "./controllers/login.controller"
import ShopBannerController from "./controllers/shopBanner.controller"
import EnquiryController from "./controllers/enquiry.controller"
// import AuthenticationController from "./authentication";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("DB Connection Successful....");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();

const uploadMulti = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        key: function (req:any, file:any, cb:any) {
            console.log(file);
            cb(null, Date.now().toString() + " " + file.originalname); //use Date.now() for unique file keys
        }
    })
});

const swaggerDocument = require("../public/swagger.json");

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin','*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Welcome TO Litchi's Swagger");
});

app.post("/createOtp",async(req,res)=>{
  const service = new UserService();
  const response = await service.createOtp(req);
  if(response.error===true) res.status(404).json(response);
  else res.status(200).json(response);
})

app.post("/createForgotPasswordOtp",async(req,res)=>{
  const service = new UserService();
  const response = await service.createForgotOtp(req);
  if(response.error===true) res.status(404).json(response);
  else res.status(200).json(response);
})

app.use("/shop", new ShopController().router);
app.use("/product", new ProductController().router);
// app.use("/authentication", new AuthenticationController().router );
app.use("/productCategory",new ProductCategoryController().router);
app.use("/productSubCategory",new ProductSubCategoryController().router);
app.use("/productChildCategory",new ProductChildCategoryController().router);
app.use("/productOffer",new ProductOfferController().router);
app.use("/user", new UserController().router);
app.use("/login",new LoginController().router);
app.use("/banner",new ShopBannerController().router);
app.use("/enquiry",new EnquiryController().router);

app.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream =  s3.getObject({ Bucket: bucketName, Key: key }).createReadStream()
  readStream.pipe(res)
})

app.get('/video/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream =  s3.getObject({ Bucket: bucketName, Key: key }).createReadStream()
  readStream.pipe(res)
})

app.post("/uploadImage",uploadMulti.single('image'),function(req,res) {
    const file:any = req.file as Express.Multer.File;
    res.send({name: file.key});
  })

app.post('/product/uploadImages', uploadMulti.array('image', 10), function(req, res, next) {
  const files = req.files as Express.Multer.File[]
  res.send({
    urls: files.map(function(file : any) {
      // return {url: file.location, name: file.key, type: file.mimetype, size: file.size};
      return {name: file.key};
    })
  });
})

app.post('/uploadReel', uploadMulti.array('video', 2), function(req, res, next) {
  const files = req.files as Express.Multer.File[]
  res.send({
    urls: files.map(function(file : any) {
      return{name:file.key};
    })
  });
})

// app.get("/list", async (req, res) => {

//   let r = await s3.listObjectsV2({ Bucket: bucketName }).promise();
//   let x = r.Contents.map(item as any => item.Key);
//   res.send(x)
// })


app.get("/stream/:filename", async (req, res) => {
  const filename = req.params.filename
  // let x = await s3.getObject({ Bucket: bucketName, Key: filename }).promise();
  // res.send(x.Body)
  const stream = await createAWSStream(bucketName,filename);
  stream.pipe(res);
})

app.delete("/delete/:filename", async (req, res) => {
  const filename = req.params.filename
  await s3.deleteObject({ Bucket: bucketName, Key: filename }).promise();
  res.send("File Deleted Successfully")

})

function createAWSStream(bucketName:any,key:any): Promise<SmartStream> {
    return new Promise((resolve, reject) => {
        const bucketParams = {
            Bucket: bucketName,
            Key: key
        }
        try {
            s3.headObject(bucketParams, (error:any, data:any) => {
                if (error) {
                    throw error;
                }
                console.log(data);
                // After getting the data we want from the call to s3.headObject
                // We have everything we need to instantiate our SmartStream class
                // If you want to pass ReadableOptions to the Readable class, you pass the object as the fourth parameter
                const stream = new SmartStream(bucketParams, s3, data.ContentLength);

                resolve(stream);
            });
        } catch (error) {
            reject(error)
        }
    });
}

app.listen(port, () => {
  console.log(`Server Listening On Port: ${port}`);
});
