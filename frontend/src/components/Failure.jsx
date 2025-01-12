import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Failure = () => {
  let data = useLocation();

  return (
    <div className="relative w-[350px] h-[350px] border-black rounded-lg flex flex-col justify-center items-center z-10 transition duration-500 backdrop-blur-md bg-[rgba(0,0,0,0.2)] shadow-2xl">
      <p className="w-fit p-3 m-3 text-lg text-center border-transparent font-normal text-white">{data.state.message}</p>
      <p><Link to={"/registration"} className='text-center text-blue-200 underline text-xl'>Register</Link></p>
    </div>
  );
}

export default Failure;