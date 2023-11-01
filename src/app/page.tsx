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

  return (
    <main className="flex flex-col items-center min-h-screen h-screen select-none">
      <Navbar/>
      <div className='flex flex-col items-center min-h-screen h-screen select-none pt-20 w-full'>
        <div className='flex flex-row w-full justify-between items-center px-5'>
          <p className='font-extrabold'>Timer: {timer} seconds</p>
          <p className='font-extrabold'>Score: {score}</p>
        </div>
        
        {gameEnded && (
          <div className='flex flex-col justify-center items-center h-full w-full'>
            <h1>Game Over</h1>
            <p>Your score is: {score}</p>
            <p>Press Start to play again...</p>
          </div>
        )}

        {!squareVisible && (
          <div className='flex flex-col justify-center items-center h-full w-full'>
          <button className='bg-green-300 rounded text-black font-bold p-3 w-32' onClick={startGame}>Start</button>
          </div>
        )}
      </div>
    
      {squareVisible && (
        <div className='w-[100px] h-[100px] bg-green-300 absolute rounded-xl'
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
