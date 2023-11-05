import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  

  return (
    <div className='absolute flex flex-row w-full h-16 bg-green-300 justify-between px-10 items-center'>
        <Link href="/" className='text-black font-bold hover:scale-150 duration-150'><h1>PressIt!</h1></Link>
        <div className='flex flex-row'>
          <Link href="/leaderboard"><p className='text-black font-bold hover:bg-green-200 p-2 rounded'>Leaderboard</p></Link>
          <Link href="/rules"><p className='text-black font-bold hover:bg-green-200 p-2 rounded'>Rules</p></Link>
        </div>

    </div>
  )
}
