import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Admin from './Admin';
import Student from './Student';

const About = () => {
  const [page, setPage] = useState(true);
  const [admin, setAdmin] = useState([]);
  const [student, setStudent] = useState([]);
  const location = useLocation();
  const naviget = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get('http://localhost:9000/api/user/get');

    const resadmin = res.data.filter((res) => {
      return res.role === 'admin';
    });

    const resstudent = res.data.filter((res) => {
      return res.role === 'student';
    });

    setAdmin(resadmin);
    setStudent(resstudent);
  };

  return (
    <>
      <div className="flex justify-between px-10 bg-gradient-to-r from-blue-200 to-cyan-200 ">
        <p className="text-3xl font-bold mt-3 h-14 text-white mb-0">
          Hello, {location.state.name}
        </p>
        <button
          onClick={() => {
            naviget('/');
            localStorage.removeItem('token');
          }}
          className="text-2xl font-medium mt-2 px-5 h-14 text-white hover:shadow ">
          Logout
        </button>
      </div>
      <div className="row container-fluid">
        <div className="col-2 bg-gradient-to-t from-slate-400 to-slate-500">
          <div className="grid grid-flow-row place-content-stretch">
            <div className="grid grid-flow-row items-stretch">
              <button
                onClick={() => {
                  setPage(true);
                }}
                className="text-xl capitalize mt-3 py-1 px-0 font-serif text-white font-medium hover:shadow">
                admin
              </button>
              <button
                onClick={() => {
                  setPage(false);
                }}
                className="text-xl capitalize mt-1 py-1 px-0 font-serif text-white font-medium hover:shadow">
                student
              </button>
            </div>
          </div>
        </div>
        <div className="col-9 ml-10">
          {page ? (
            <Admin admin={admin} student={student} getData={getData} />
          ) : (
            <Student student1={student} getData={getData} />
          )}
        </div>
      </div>
    </>
  );
};

export default About;
