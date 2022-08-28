import express from "express";
import ReportSwagger from "../swagger/report.swagger";

export default class ReportController {
    public router = express.Router();
    constructor() {
        this.initializeRoutes();
    }
    public initializeRoutes() {
        this.router.post("/createReport/", this.createReport);
        this.router.get("/getAllReports/", this.getAllReports);
    }
    public async getAllReports(req: any , res: any) {
        try {
            console.log({ message: "Fetching All Reports" });
            const swagger = new ReportSwagger();
            const response = await swagger.getAllReports();
            res.send(response);
        } 
        catch (err) {
            console.log({ message: "Getting Reports Operation Failed.", err });
            res.status(500).json(err);
        }
    }
    public async createReport(req: any, res: express.Response) {
        try {
            console.log({ message: "Creating Report" });
            const swagger = new ReportSwagger();
            const response = await swagger.createReport(req);
            res.status(200).json(response);
        } 
        catch (err) {
            console.log({ message: "Creating Report Operation Failed.", err });
            res.status(500).json(err);
        }
    }
}