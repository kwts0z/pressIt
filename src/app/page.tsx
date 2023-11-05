"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react';
import Navbar from './navbar';

export default function Home() {
  const [gameEnded, setGameEnded] = useState(false);
  const [squarePosition, setSquarePosition] = useState({ x: 0, y: 0 });
  const [squareVisible, setSquareVisible] = useState(false);
  const [timer, setTimer] = useState(60); // Timer in seconds
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [formSubmited, setFormSubmited] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const startGame = () => {
    // Calculate random x and y positions within the window dimensions
    const maxX = window.innerWidth - 100; // Adjust as needed for your square size
    const maxY = window.innerHeight - 100; // Adjust as needed for your square size

    const randomX = Math.floor(Math.random() * (maxX - 100)) + 100;
    const randomY = Math.floor(Math.random() * (maxY - 100)) + 100;

    setSquarePosition({ x: randomX, y: randomY });
    setSquareVisible(true);

    // Start the timer when the square is spawned
    setTimer(60);
    setScore(0);
    setGameEnded(false);
    setFormSubmited(false);
    setFormLoading(false);
  };

  const squareClick = () => {
    // Calculate random x and y positions within the window dimensions
    const maxX = window.innerWidth - 100; // Adjust as needed for your square size
    const maxY = window.innerHeight - 100; // Adjust as needed for your square size

    const randomX = Math.floor(Math.random() * (maxX - 100)) + 100;
    const randomY = Math.floor(Math.random() * (maxY - 100)) + 100;

    setSquarePosition({ x: randomX, y: randomY });
    setScore(score+1);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | number | undefined = undefined;
    if (squareVisible) {
      // Start a timer interval when the square is visible
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); // Update the timer every 1000ms (1 second)
    } else {
      // Clear the timer interval when the square is not visible
      clearInterval(interval);
    }

    return () => {
      // Cleanup the interval when the component unmounts
      clearInterval(interval);
    };
  }, [squareVisible]);

  useEffect(() => {
    if (timer == 0){
      setSquareVisible(false);
      setGameEnded(true);
    }
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    setFormLoading(true);
    e.preventDefault();

    try {
      const result = await fetchData(name, score);
      setFormSubmited(true);
      setFormLoading(false);
      // You can update your component's state or display a success message
    } catch (error) {
      console.error('Error adding player:', error);
      // Handle the error, e.g., display an error message
    }
  }

  return (
    <main className="flex flex-col items-center min-h-screen h-screen select-none">
      <div className='flex flex-col items-center min-h-screen h-screen select-none pt-20 w-full'>
        <div className='flex flex-row w-full justify-between items-center px-5'>
          <p className='font-extrabold'>Timer: {timer} seconds</p>
          <p className='font-extrabold'>Score: {score}</p>
        </div>
        
        {gameEnded && (
          <div className='flex flex-col justify-center items-center h-full w-full'>
            <h1 className='font-extrabold text-3xl text-green-300'>Game Over!</h1>
            <p>Your score is: {score}</p>
            <p>{!formSubmited && "Add a nickname to get on the leaderboard or"} Press Start to play again...</p>
          </div>
        )}
        {!formSubmited && gameEnded && !formLoading && (
          <div className='flex justify-center items-center h-full w-full'>
            <form className="space-x-5" onSubmit={handleSubmit}>
              <label>
                Nickname:
                <input className='text-black pl-2'
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                />
              </label>
              <button className="bg-green-300 px-2 rounded text-black font-bold h-8 hover:bg-green-200" type="submit">Submit</button>
            </form>
          </div>
        )}

        {formSubmited && gameEnded && (
          <p className='text-green-300'>Submitted successfully!!!</p>
        )}

        {formLoading&& gameEnded && (
          <p className='text-green-300'>Loading...</p>
        )}

        {!squareVisible && (
          <div className='flex flex-col justify-center items-center h-full w-full'>
          <button className='bg-green-300 rounded text-black font-bold p-3 w-32 hover:bg-green-200' onClick={startGame}>Start</button>
          </div>
        )}
      </div>
    
      {squareVisible && (
        <div className='w-[100px] h-[100px] bg-green-300 absolute rounded-xl hover:bg-green-200'
        onClick={squareClick}
        style={{
          left: squarePosition.x + 'px',
          top: squarePosition.y + 'px',
        }}
        ></div>
      )}
      
    </main>
  )
}


async function fetchData(name:string, score:number) {
  try {
    const response = await fetch('./api/add-player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, score }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}
