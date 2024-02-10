import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import img from './what-to-do.jpg';

function App() {
  const [data, setData] = useState(null); // Хранение данных с сервера
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Флаг для активации/деактивации кнопки
  const [secondsRemaining, setSecondsRemaining] = useState(0); // Счетчик времени

  // Функция для получения данных
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/data');
      setData(response.data);
      setIsButtonDisabled(true); // Делаем кнопку неактивной
      setSecondsRemaining(30); // Устанавливаем счетчик обратного отсчета на 30 секунд
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  // Эффект для обратного отсчета времени
  useEffect(() => {
    let timer = null;

    if (secondsRemaining > 0) {
      timer = setTimeout(() => {
        setSecondsRemaining((seconds) => seconds - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
    }

    return () => clearTimeout(timer);
  }, [secondsRemaining]);

  return (
    <div className='page'>
      <div className='page__container'>
        <h1 className='page__title'>Are you bored?</h1>
        <img className='page__img' src={img} alt='question' />
        <button
          className={`page__button${
            isButtonDisabled ? ' page__button_disabled' : ''
          }`}
          onClick={fetchData}
          disabled={isButtonDisabled}
        >
          Ask! {isButtonDisabled && `(${secondsRemaining})`}
        </button>
        <p className='page__description'>Data is updated 2 times per minute</p>
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
