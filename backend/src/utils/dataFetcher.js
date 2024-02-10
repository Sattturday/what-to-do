const axios = require('axios');

let globalData = null;

async function fetchData() {
  try {
    const response = await axios.get('https://www.boredapi.com/api/activity');
    globalData = response.data;
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

function getGlobalData() {
  return globalData;
}

// Вызов функции fetchData раз в 1 минуты
setInterval(fetchData, 60000);

module.exports = { fetchData, getGlobalData };
