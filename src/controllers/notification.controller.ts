const AWS = require("aws-sdk");
const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
const sns = new AWS.SNS({ credentials: credentials, region: "ap-south-1" });
const express = require("express")
export default function NotificationController():any {
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

var payload = {
    "GCM":"{ \"notification\": { \"body\": \"Sample message for Android or iOS endpoints\", \"title\":\"TitleTest\" } }"
  };
var topicPayload = {
    "default":"{\"default message\"}}",
    "GCM":"{ \"notification\": { \"body\": \"Sample message for Android or iOS endpoints\", \"title\":\"TitleTest\"} }"
  };

router.get("/status", (req:any, res:any) => res.json({ status: "ok", sns: sns }));

router.post("/addEndpoint", async (req:any, res:any) => {
    await sns.createPlatformEndpoint(
      {
        PlatformApplicationArn: process.env.PlatformApplicationArn,
        Token: req.body.token,
      },
      (data: any, err: any) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(data);
          res.send(data);
        }
      }
    );
  });
  
  router.post("/subscribe", (req:any, res:any) => {
    let params = {
      TopicArn: "arn:aws:sns:ap-south-1:876260917974:User_Creation",
      Protocol: "application",
      Endpoint: req.body.token,
      ReturnSubscriptionArn: true,
    };
  
    sns.subscribe(params, (err: any, data: any) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
    });
  });

  router.post("/endpoint/publish/", (req:any, res:any) => {
    console.log("Sending push on endpoints");
    sns.publish(
      {
        TargetArn:"arn:aws:sns:ap-south-1:876260917974:endpoint/GCM/Litchies_Notifications/721e2623-e294-3b12-ae8d-bb2c8fabe3e7", // Required
        MessageStructure: 'json',
        Message: JSON.stringify(payload) // Required
      },
      (err: any, data: any)=>{
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
        res.send(data);
      }
    );
  })

  
  router.post("/topic/publish", (req:any, res:any) => {
    // var payload = {
    //   'GCM': {
    //     "notification": {
    //       "android":{},
    //       "title": "Flutter SNS Notification",
    //       "body": "Sample message for Android endpoints",
    //       'default':"hello"
    //     }
    //   }
    // };
  
    console.log("Sending push on topic");
    sns.publish(
      {
        TopicArn:"arn:aws:sns:ap-south-1:876260917974:User_Creation",
        MessageStructure: 'json',
        Message: JSON.stringify(topicPayload) // Required
      },
      (err: any, data: any)=>{
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
        res.send(data);
      }
    );
  });
  return router;
}