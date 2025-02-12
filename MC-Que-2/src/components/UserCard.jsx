import React from "react";

const UserCard = ({ currentUsers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {currentUsers.map((user) => (
        <div
          key={user.id}
          className="p-4 !space-y-3 rounded-lg shadow-md bg-white text-center flex flex-col items-center"
        >
          {/* User Image */}
          <img
            src={user.image}
            alt={user.firstName}
            className="w-20 h-20 rounded-full"
          />

          {/* Name */}
          <h2 className="text-lg font-semibold mt-2">
            {user.firstName} {user.lastName}
          </h2>

          {/* Email with Proper Wrapping */}
          <p className="text-gray-500 text-sm">{user.email}</p>
          {/* Contact */}
          <p className="text-gray-500 text-sm">{user.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
