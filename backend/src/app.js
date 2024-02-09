const express = require('express');
const cors = require('cors');

const v1Router = require('./v1/routes/dataRouter');
const { fetchData } = require('./utils/dataFetcher');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use('/api/v1', v1Router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);

  // Вызываем fetchData для инициализации процесса загрузки данных
  fetchData();
});
