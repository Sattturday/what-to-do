import React, { useState, useEffect } from 'react';

import './App.css';
import img from './what-to-do.jpg';

interface ActivityData {
  activity: string;
  type: string;
  participants: number;
  time: string;
}

function hasOwnPropertyFromUnknown<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

const App: React.FC = () => {
  const [data, setData] = useState<ActivityData | null>(null); // Хранение данных с сервера
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // Флаг для активации/деактивации кнопки
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0); // Счетчик времени

 async function fetchData(): Promise<boolean> {
  let response: Response;
    
  try {
    response = await fetch("http://localhost:5000/api/v1/data");
  } catch (e) {
    console.error(
      "679a7a31-a891-4e77-97fd-e0d3fb075c83 Error fetching data:",
      e
    );
    return false;
  }

    try {
      const jsonData: unknown = await response.json();

      if (
        typeof jsonData === 'object' &&
        jsonData !== null &&
        hasOwnPropertyFromUnknown(jsonData, 'activity') &&
        typeof jsonData.activity === 'string' &&
        hasOwnPropertyFromUnknown(jsonData, 'type') &&
        typeof jsonData.type === 'string' &&
        hasOwnPropertyFromUnknown(jsonData, 'participants') &&
        typeof jsonData.participants === 'number' &&
        hasOwnPropertyFromUnknown(jsonData, 'time') &&
        typeof jsonData.time === 'string'
      ) {
        setData({
          activity: jsonData.activity,
          type: jsonData.type,
          participants: jsonData.participants,
          time: jsonData.time
        });
        setIsButtonDisabled(true); // Делаем кнопку неактивной
        setSecondsRemaining(30); // Устанавливаем счетчик обратного отсчета на 30 секунд
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('aff46288-ff0d-46d1-bec0-cf57b12d9b7c Error fetching data:', 
      error
      );
      return false;
    }
  }

  // Эффект для обратного отсчета времени
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (secondsRemaining > 0) {
      timer = setTimeout(() => {
        setSecondsRemaining((seconds) => seconds - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
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
        <ul className='activity'>
          <li className='activity__item'>
            <span>Activity: </span>
            {data.activity}
          </li>
          <li className='activity__item'>
            <span>Type: </span>
            {data.type}
          </li>
          <li className='activity__item'>
            <span>Participants: </span>
            {data.participants}
          </li>
          <li className='activity__item'>
            <span>Time: </span>
            {data.time}
          </li>
        </ul>
      )}
    </div>
  );
}

export default App;
