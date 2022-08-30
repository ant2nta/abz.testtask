import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/users";
import Loader from "../Loader/Loader";
import UserInfo from "../UserInfo/UserInfo";
import "./UsersTable.scss";

const UsersTable = ({ newUser }) => {
  const [users, setUsers] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMoreUsers = () => {
    getUsers(nextPage)
      .then(data => {
        const { success, users, links } = data;

        if (success) {
          
          setUsers(currentUsers => [...currentUsers, ...users]);
          setNextPage(links.next_url);
        }
      });
  };

  const loadUsers = () => {
    setIsLoading(true);

    getUsers().then(data => {
      const { success, users, links } = data;

      if (success) {
        setUsers(users);
        setNextPage(links.next_url);
      }
    });

    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(loadUsers, []);
  useEffect(loadUsers, [newUser]);

  return (
    <section className="users" id="users">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="users__title">
            Working with GET request
          </h1>

          <ul className="users__list">
            {users.map(user => (
              <li className="users__item" key={user.id}>
                <UserInfo user={user} />
              </li>
            ))}
          </ul>

          <button className="users__show-more button" onClick={handleLoadMoreUsers}>
            Show more
          </button>
        </>
      )}
    </section>
  );
};

export default UsersTable;
