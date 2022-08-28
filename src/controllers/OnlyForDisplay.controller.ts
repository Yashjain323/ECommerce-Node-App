import OnlyForDisplaySwagger from "./../swagger/onlyForDisplayAPIs.swagger";

export default function OnlyForDisplay() {
const swagger = new OnlyForDisplaySwagger();
swagger.imagesShow();
swagger.videoShow()
swagger.uploadImage()
swagger.uploadImages()
swagger.uploadReel()
swagger.streamVideo()
swagger.deleteFile()
}