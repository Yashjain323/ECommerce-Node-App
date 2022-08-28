import { Get, Post,Route, Tags, Body } from "tsoa";
import { ReportService } from "../services/report.service";

interface Response {
    error: boolean;
    message: string;
  }
  
  interface IReport {
    productId: string;
    userId: string;
    message: string;
  }
@Route("report")
@Tags("Report")
export default class ReportSwagger {
  @Post("/createReport")
  public async createReport(@Body() request: IReport): Promise<Response> {
    const service = new ReportService();
    const res = await service.createReport(request);
    return res;
  }

  @Get("/getAllReports")
  public async getAllReports(): Promise<IReport[]> {
    const service = new ReportService();
    const res = await service.getAllReports();
    return res;
  }
}