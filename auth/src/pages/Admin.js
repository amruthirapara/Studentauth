import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Admin = (props) => {
  const naviget = useNavigate();

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/user/delete/${id}`);
      props.getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <table className="table  mt-5 text-center">
        <caption className="text-center bg-slate-400 font-medium text-xl text-white">
          Admin
        </caption>
        <thead className="table-light">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {props.admin.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => {
                    naviget(`/update/${user._id}`);
                  }}
                  className="button is-info is-small mr-1">
                  <EditIcon />
                </button>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="button is-danger is-small">
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="table mt-5 text-center">
        <caption className="text-center bg-slate-400 font-medium text-white text-xl">
          Student
        </caption>
        <thead className="table-light">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {props.student.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => {
                    naviget(`/update/${user._id}`);
                  }}
                  className="button is-info is-small mr-1">
                  <EditIcon />
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="button is-danger is-small">
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
