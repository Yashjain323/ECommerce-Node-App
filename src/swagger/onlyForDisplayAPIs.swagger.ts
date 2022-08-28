import {
    Get,
    Post,
    Put,
    Delete,
    Route,
    Tags,
    Body,
  } from "tsoa";
  
  interface Response {
    error: boolean;
    message: string;
  }
 
  @Route("aws")
  @Tags("Only For Display - Please exclude '/aws' while using these endpoints")
  
export default class OnlyForDisplaySwagger {
 
@Get("/images/:key")
  public imagesShow() {
    return 
  }

@Get("/video/:key")
  public videoShow() {
    return 
  }

@Post("/uploadImage")
  public uploadImage() {
    return
  }

@Post("/product/uploadImages")
  public uploadImages() {
    return 
  }

@Post("/uploadReel")
  public uploadReel() {
    return
  }

@Get("/stream/:filename")
  public streamVideo() {
    return 
  }

@Delete("/delete/:filename")
  public deleteFile() {
    return
  }
  
}