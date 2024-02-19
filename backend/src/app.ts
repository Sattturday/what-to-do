import express from "express";
import cors from "cors";
import v1Router from "./v1/routes/dataRouter";
import { fetchData } from "./utils/dataFetcher";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);

  // Вызываем fetchData для инициализации процесса загрузки данных
  fetchData();
});
