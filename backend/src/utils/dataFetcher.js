const axios = require('axios');

let globalData = null;

async function fetchData() {
  try {
    const response = await axios.get('https://www.boredapi.com/api/activity');

    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    const newData = { ...response.data, time: formattedTime };
    globalData = newData;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

function getGlobalData() {
  return globalData;
}

// Вызов функции fetchData 2 раза в минуту
setInterval(fetchData, 30000);

module.exports = { fetchData, getGlobalData };
