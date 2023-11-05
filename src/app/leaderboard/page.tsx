"use client"
import { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  score: number;
}

export default function Leaderboard() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response =  fetch('/api/get-player', { cache: 'no-cache' }).then((e) => {
      e.json().then((a) => {
        setData(a);
        setLoading(false);
        console.log('frontend data: ', a);
      });  
    });
  }, []);

  return (
    <main className='flex flex-col justify-center items-center space-y-5 min-h-screen'>
        <h1 className="text-3xl font-bold text-green-300 underline">Leaderboard</h1>
        <div className="flex flex-row w-1/3 justify-between text-green-300">
          <h1>Nickname</h1>
          <h1>Score</h1>
        </div>
        <div className="flex w-1/3 overflow-auto">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <ul className="w-full">
              <li className="w-full divide-y">
                {data.map((item, index) => (
                  <ul key={index} className="flex flex-row w-full justify-between">
                    <li key={index}>{item.name}:</li>
                    <li key={index}>{item.score}</li>
                  </ul>
                ))}
              </li>
            </ul>
          )}
        </div>
    </main>
  );
}
