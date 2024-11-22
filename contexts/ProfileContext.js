import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  return (
    <ProfileContext.Provider value={{ userId, setUserId, token, setToken, profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
