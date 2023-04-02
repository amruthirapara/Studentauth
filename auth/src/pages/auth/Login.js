import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const naviget = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().min(3).max(15).required(),
    password: yup.string().min(8).max(15).required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = async (data, e) => {
    e.preventDefault();
    // console.log(data);
    const res = await axios.post('http://localhost:9000/api/user/login', data);
    console.log(res);
    localStorage.setItem('token', res.data.token);
    if (res.data.token) {
      naviget('/about', { state: data });
      // if (res.data.role === 'admin') {
      //   naviget('/admin', { state: data });
      // } else {
      //   naviget('/student', { state: data });
      // }
    }
    reset();
  };
  return (
    <div className=" bg-gradient-to-tr from-blue-300 via-pink-300 to-cyan-300 h-screen  top-0">
      <div className="w-1/4 m-auto bg-white rounded-md capitalize font-serif">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid grid-cols-1 px-5 py-3 ">
          <label htmlFor="first" className="py-1 text-lg pl-1">
            name:
          </label>
          <input
            {...register('name')}
            className="outline-none p-2 rounded-md shadow-lg"
          />
          <p className="text-red-500 pt-2 text-sm pl-1">
            {errors.name?.message}
          </p>
          <label htmlFor="last" className="py-1 text-lg pl-1">
            Password:
          </label>
          <input
            {...register('password')}
            className="outline-none p-2 rounded-md shadow-lg"
          />
          <p className="text-red-500 pt-2 text-sm pl-1">
            {errors.password?.message}
          </p>

          <button
            type="submit"
            className="bg-red-300 py-1 mt-3 text-lg rounded-sm  hover:shadow-md hover:shadow-red-50">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
