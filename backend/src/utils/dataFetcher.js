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

// Вызов функции fetchData каждые 5 минут
setInterval(fetchData, 300000);

module.exports = { fetchData, getGlobalData };
