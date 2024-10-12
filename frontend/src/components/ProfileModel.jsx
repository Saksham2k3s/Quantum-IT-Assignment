import React from "react";
import { RxCross1 } from "react-icons/rx";

function ProfileModel({ userInfo, onClickHandler }) {
  const { firstName, lastName, image, email, role, birthDate } = userInfo;

  return (
    <>
      {/* Background Blur */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-lg p-8 rounded-lg shadow-lg z-20 transition-transform duration-300">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition-colors"
          onClick={onClickHandler}
        >
          <RxCross1 className="w-6 h-6" />
        </button>

        {/* Profile Info */}
        <div className="text-center">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <img
              src={image}
              alt={`${firstName} ${lastName}`}
              className="h-32 w-32 rounded-full object-cover border-4 border-gray-200 shadow-md transition-transform duration-300 transform hover:scale-110"
            />
          </div>

          {/* Name */}
          <h2 className="text-3xl font-bold mb-2">{`${firstName} ${lastName}`}</h2>
          <p className="text-gray-600 text-sm mb-1">Role: <span className="font-semibold text-gray-800">{role}</span></p>
          <p className="text-gray-600 text-sm mb-1">Email: <span className="font-semibold text-gray-800">{email}</span></p>
          <p className="text-gray-600 text-sm">Birth Date: <span className="font-semibold text-gray-800">{birthDate}</span></p>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={onClickHandler}
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileModel;
