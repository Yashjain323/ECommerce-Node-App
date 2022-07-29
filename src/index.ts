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
const dbUrl = process.env.dbUrl || "";
const app: express.Application = express();
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})
import ShopController from "./controllers/shop.controller";
import swaggerUi from "swagger-ui-express";
import ProductController from "./controllers/product.controller";

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
  res.setHeader('Access-Control-Allow-Origin','http://localhost:3001');
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
app.use("/shop", new ShopController().router);
app.use("/product", new ProductController().router);

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

app.post("/shop/uploadImage",uploadMulti.single('image'),function(req,res) {
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


app.get("/download/:filename", async (req, res) => {
  const filename = req.params.filename
  let x = await s3.getObject({ Bucket: bucketName, Key: filename }).promise();
  res.send(x.Body)
})

app.delete("/delete/:filename", async (req, res) => {
  const filename = req.params.filename
  await s3.deleteObject({ Bucket: bucketName, Key: filename }).promise();
  res.send("File Deleted Successfully")

})

app.listen(port, () => {
  console.log(`Server Listening On Port: ${port}`);
});
