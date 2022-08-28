import ReportModel from "../models/report.model";

export class ReportService{
    constructor() {}

    public async getAllReports() {
      const Report = await ReportModel.find();
      return Report;
    }
  
    // Creates an Report.
    public async createReport(request: any) {
      const Report = new ReportModel({
        ...request.body,
      });
      await Report.save();
      return { error: false, message: "Report Creation Successful" };
    }
}