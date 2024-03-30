 "use client"
import { fetchCurrentUser } from "@/redux/actions/auth";
import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
const YourComponent = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCurrentUser());
        setUser(response);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      {user ? (
        <div>
          <h1>Current User:</h1>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default YourComponent;


