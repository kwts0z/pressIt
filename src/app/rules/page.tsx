"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Rules() {
  return (
    <main className='flex flex-col justify-center items-center min-h-screen'>
        <h1 className="font-bold text-green-300 text-3xl pb-5">Rules</h1>
        <p>The goal of the game is to collect as many points as possible before the timer stops.</p>
        <p>Every time you click the green square you get 1 point,</p>
        <p>but hurry up you only have 1 minute!!</p>
        <p>Dont forget to add your score to the Leaderboard</p>
        <Link href="/">
            <button className="bg-green-300 px-2 rounded text-black font-bold h-10 w-24 mt-5 hover:bg-green-200">
                Play
            </button>
        </Link>
    </main>
  );
}