import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Update = () => {
  const { id } = useParams();
  const naviget = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().min(3).max(15).required(),
    email: yup.string().min(8).max(35).required(),
    password: yup.string().min(8).max(15).required(),
    cpassword: yup.string().min(8).max(15).required(),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getUserById();
  }, [id]);

  const getUserById = async () => {
    const response = await axios.get(
      `http://localhost:9000/api/user/get/${id}`
    );
    console.log(response);
    reset({
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
      password: '',
      cpassword: '',
    });
  };

  const submitHandler = async (data, e) => {
    e.preventDefault();
    // console.log(data);
    await axios.patch(`http://localhost:9000/api/user/update/${id}`, data);

    naviget('/about', { state: data });
  };

  return (
    <div className=" bg-gradient-to-tr from-blue-300 via-pink-300 to-cyan-300 h-screen  top-0">
      <div className="w-1/4 m-auto bg-white rounded-md capitalize font-serif">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid grid-cols-1 px-5 py-3">
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
          <label htmlFor="first" className=" text-lg pl-1">
            email:
          </label>
          <input
            {...register('email')}
            className="outline-none p-2 rounded-md shadow-lg"
          />
          <p className="text-red-500 pt-2 text-sm pl-1">
            {errors.email?.message}
          </p>
          <label htmlFor="role" className=" text-lg pl-1">
            role:
          </label>
          <select
            id="role"
            {...register('role')}
            className="outline-none p-2 rounded-md shadow-lg">
            <option value="admin">admin</option>
            <option value="student">student</option>
          </select>

          <label htmlFor="last" className="pt-4 text-lg pl-1">
            Password:
          </label>
          <input
            {...register('password')}
            className="outline-none p-2 rounded-md shadow-lg"
          />
          <p className="text-red-500 pt-2 text-sm pl-1">
            {errors.password?.message}
          </p>
          <label htmlFor="last" className=" text-lg pl-1">
            Confirm Password:
          </label>
          <input
            {...register('cpassword')}
            className="outline-none p-2 rounded-md shadow-lg"
          />
          <p className="text-red-500 pt-2 text-sm pl-1">
            {errors.cpassword?.message}
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

export default Update;
