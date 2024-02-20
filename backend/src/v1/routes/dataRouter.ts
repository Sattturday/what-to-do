import express, { Router, Request, Response } from "express";
import { getGlobalData } from "../../utils/dataFetcher";

const router: Router = express.Router();

router.get("/data", (req: Request, res: Response) => {
  const data = getGlobalData();
  
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: "Data not available" });
  }
});

export default router;
