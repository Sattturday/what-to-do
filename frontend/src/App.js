import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import img from './what-to-do.jpg';

function App() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className='page'>
      <div class='page__container'>
        <h1 className='page__title'>Are you bored?</h1>
        <button className='page__button' onClick={fetchData}>
          Ask!
        </button>
        <img className='page__img' src={img} alt='question' />
        <p className='page__description'>Data is updated once per minute</p>
      </div>
      {data && (
        <div className='activity'>
          <h2 className='activity__title'>
            <span>Activity: </span>
            {data.activity}
          </h2>
          <p className='activity__subtitle'>
            <span>Type: </span>
            {data.type}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
