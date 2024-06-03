"use client";
import React, { useState, useEffect } from 'react';
import {useSearchParams } from "next/navigation";
import axios from 'axios';

const ActivationPage = () => {
  const [activation_code, setActivationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const searchParams = useSearchParams();
  const activation_token = searchParams.get('token');
    
  const handleActivation = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/activate', { activation_code, activation_token });
      const { success, message } = response.data;

      if (success) {
        setSuccessMessage(message);
        setActivationCode('');
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Activate Account</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <div>
        <label htmlFor="activationCode">Activation Code:</label>
        <input
          type="text"
          id="activationCode"
          value={activation_code}
         onChange={(e) => setActivationCode(e.target.value)}
         required
        />
      </div>
      <button onClick={handleActivation}>Activate</button>
    </div>
  );
};

export default ActivationPage;