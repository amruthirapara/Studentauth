import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
const Home = () => {
  const naviget = useNavigate();
  return (
    <>
      <div className=" pr-8 pt-8 text-xl text-right pb-2 text-white bg-gradient-to-r from-slate-100 to-blue-300 container-fluid font-bold font-serif">
        <div className="pr-8 ">
          <button
            onClick={() => {
              naviget('/login');
            }}
            className="px-5">
            Login
          </button>
          <button
            onClick={() => {
              naviget('/registration');
            }}>
            signup
          </button>
        </div>
      </div>
      <div className="pic"></div>
    </>
  );
};

export default Home;
