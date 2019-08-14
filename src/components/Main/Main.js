import React, { useState, useEffect, useRef } from 'react';

import { auth, database } from '../../firebase/firebase';

import Auth from '../Auth/Auth';
import User from '../User/User';
import UserCard from '../UserCard/UserCard';

import './Main.css';

const Main = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState({});

  const userRef = useRef(null);
  const usersRef = useRef(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setCurrentUser(user);

      if (user) {
        usersRef.current = database.ref('/users');
        userRef.current = usersRef.current.child(user.uid);

        userRef.current.once('value').then(snapshot => {
          if (snapshot.val()) return;

          const userData = (({ displayName, photoURL, email }) => ({
            displayName,
            photoURL,
            email
          }))(user);
          userRef.current.set(userData);
        });

        usersRef.current.on('value', snapshot => {
          setUsers(snapshot.val());
        });
      }
    });
  }, []);

  return (
    <main id="main-component">
      {currentUser ? (
        <>
          <User user={currentUser} />
          <section className="user-card-container">
            <h2>All users</h2>
            <div className="user-card-items">
              {Object.entries(users).map(([key, user]) => (
                <UserCard key={key} user={user} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <Auth />
      )}
    </main>
  );
};

export default Main;
