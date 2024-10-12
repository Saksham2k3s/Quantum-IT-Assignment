import React, { useEffect, useState } from 'react';
import { FaCog, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slices/getAllUserSlice';
import Loader from './Loader';
import Pagination from './Pagination';
import toast from 'react-hot-toast';
import ProfileModel from './ProfileModel';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const navigate = useNavigate()
  const { isLoading, users, isError, errorMessage, currentPage } = useSelector((state) => state.allUsers);
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});  

  useEffect(() => {
    dispatch(fetchUsers({ currentPage: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (isError && errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage, isError]);

  const onClickHandler = (userInfo) => {  
    setSelectedUser(userInfo);  
    setIsModelOpen(!isModelOpen);
  };

  const logoutHanlder = () => {
     dispatch(logout());
     if(!user){
      toast.success("User logged out successfully");
      navigate('/sign-in')
     }
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 overflow-scroll lg:overflow-x-hidden lg:overflow-y-hidden ">
          <div className='flex justify-between' >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Management</h2>
          <button
              type="submit"
              className={`bg-blue-500 text-white self-center py-2 rounded-lg px-4`}
              onClick={logoutHanlder}
            >
              LOGOUT
            </button>
          </div>

          {isLoading ? (
            <div className="w-full h-screen flex flex-col justify-center items-center">
              <Loader />
              <div>Fetching Users</div>
            </div>
          ) : users.length > 0 ? ( 
            <table className="min-w-full bg-white border-collapse ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Birth Date</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id} 
                    className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer "
                    onClick={() => onClickHandler(user)}
                  >
                    <td className="border-b border-gray-200 px-4 py-3">{user.id}</td>
                    <td className="border-b border-gray-200 px-4 py-3 flex items-center">
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span>{user.firstName} {user.lastName}</span>
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3">{user.birthDate}</td>
                    <td className="border-b border-gray-200 px-4 py-3">{user.company.title}</td>
                    <td className="border-b border-gray-200 px-4 py-3">
                      {user.email}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3 flex space-x-4">
                      <button className="text-blue-500 hover:text-blue-700 transition-colors">
                        <FaCog />
                      </button>
                      <button className="text-red-500 hover:text-red-700 transition-colors">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No users available</p>
          )}

          
        </div>
        {!isLoading && <Pagination />}
        {isModelOpen && <ProfileModel userInfo={selectedUser} onClickHandler={onClickHandler} />}
      </div>
    </>
  );
}

export default UserList;
